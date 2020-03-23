import React, { Component } from 'react'
import { Card,Button, Table, Pagination, Modal, message } from 'antd'
import  { getAtricle,deleteAtricle }  from '../../requests'
import  moment  from 'moment'
import XLSX from 'xlsx'

const ButtonGroup = Button.Group
const columnsMap = {
    id: 'id',
    title: '标题',
    amount: '阅读量',
    author: '作者',
    createAt: '创建时间'
}
export default class Article extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            offset: 0,
            limited: 10,
            loading: false,
            visible: false,
            confirmLoading: false,
            title: ''
        }
    }
    getData() {
        getAtricle(this.state.offset, this.state.limited)
        .then(resp => {
            const columnKeys = Object.keys(resp.data.list[0])
            const columns = columnKeys.map((item) => {
                if(item === 'createAt'){
                    return {
                        title: columnsMap[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record) =>{
                            const { createAt } =  record;
                            return moment(createAt).format('YYYY年MM月DD日 HH时mm分')
                        }
                    }  
                }
                return {
                    title: columnsMap[item],
                    dataIndex: item,
                    key: item,
                }
            })
            columns.push({
                title:'操作',
                key: 'action',
                render: (record) => {
                    return <ButtonGroup>
                        <Button size={"small"} type={'primary'} onClick={this.editAtricle.bind(this, record)} >编辑</Button>
                        <Button size={"small"} type={'danger'} onClick={this.deleteInfo.bind(this, record)}>删除</Button>
                    </ButtonGroup>
                }
            })
            this.setState({
                total: resp.total,
                columns: columns,
                dataSource:resp.data.list,
                loading: false
            })
        })
        .catch(err => console.log(err)) 
    }
    onPageChange = (page, pageSize) => {
        this.setState({
            offset: pageSize * (page - 1),
            limited: pageSize,
            loading: true
        },() =>{
            this.getData()
        })
    }
    componentDidMount() {
        this.getData()
    }
    onShowSizeChange = (current, size) => {
        this.setState({
            offset: 0,
            limited: size
        },() =>{
            this.getData()
        })
    }
    deleteInfo = (record) => {
        this.setState({
            visible: true,
            title: record.title
        })
    }
    closeDelete = () => {
        this.setState({
            visible: false,
        })
    }
    deleteOk = () => {
        this.setState({
            confirmLoading:true
        }, () => {
            deleteAtricle()
                .then((resp) => {
                    message.success(resp.data.msg)
                    this.getData()
                })
                .finally(() => {
                    this.setState({
                        visible: false,
                        confirmLoading:false,
                        title: '',
                        offset: 0
                    })
                })
        })
    }
    editAtricle = (record) => {
        this.props.history.push({
            pathname:`/admin/article/edit/${record.id}`
        })
    }
    
    导出Excel
    exportExcel = () => { 
        /* convert state to workbook */
        const data = [Object.keys(this.state.dataSource[0])]
        for(let i =0; i< this.state.dataSource.length; i++){
            // data.push(Object.values(this.state.dataSource[i]))
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].auther,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH时mm分')
            ])
        }
        console.log(data)
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        const date = new Date()
        const excleName = moment(date).format('YYYY年MM月DD日 HH时mm分')
		XLSX.writeFile(wb, `${excleName}.xlsx`)
    }
    render() {
        return (
            <div className="site-card-border-less-wrapper">
                <Card 
                    title="文章列表" 
                    bordered={false} 
                    extra={<Button onClick={this.exportExcel}>导出Excel</Button>}
                >
                <Table
                    rowKey={record=>record.id} 
                    columns={this.state.columns} 
                    dataSource={this.state.dataSource} 
                    pagination={false}
                    loading={this.state.loading}
                />
                <Pagination 
                    defaultCurrent={6} 
                    total={this.state.total}
                    hideOnSinglePage={true} 
                    className="ant-pagination ant-table-pagination"
                    pageSizeOptions={['10', '20', '30', '40']} 
                    showQuickJumper={true}
                    showSizeChanger={true}
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.onPageChange}
                    current={this.state.offset/this.state.limited + 1}
                />
                <Modal
                    confirmLoading={this.state.confirmLoading}
                    maskClosable={false}
                    visible={this.state.visible}
                    onCancel={this.closeDelete}
                    onOk={this.deleteOk}
                    title={`确认删除${this.state.title}吗！！！`}
                >
                    此操作不可逆
                </Modal>
                </Card>
            </div>
        )
    }
}

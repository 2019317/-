import React, { Component,createRef } from 'react'
import { Button, Card,Form, Input, DatePicker, Spin } from 'antd'
import E from 'wangeditor'
import { editAtricle, editOkAtricle } from '../../requests'
import  moment  from 'moment'
import './Edit.less'

export default class Edit extends Component {
    
    constructor () {
        super()
        this.editorRef = createRef()
        this.formRef = createRef();
        this.state={
            loading :false
        }
    }
    dontSetEdit = () => {
        this.props.history.goBack()
    }
    submitAtricle = (value) => {
        this.setState({
            loading: true
        })
        const data = Object.assign({}, value,{
            createAt: value.createAt._i
        })
        editOkAtricle(data)
            .then(() => {
                // this.props.history.push('/admin/article/')
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }
    initEditor = () => {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange =  (html) => {
            console.log(this.formRef)
             this.formRef.current.setFieldsValue({
                content: html
            })
        }
        this.editor.create()
    }
    componentDidMount (){
        this.initEditor()
        this.setState({
            loading: true
        })
        editAtricle()
        // 需要编辑的文章id在this.props.match.params中获取
            .then((resp) => {
                const { id, ...data} = resp.data
                console.log()
                data.createAt = moment(data.createAt)
                this.formRef.current.setFieldsValue(data)
                this.editor.txt.html(data.content)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }
    render() {
        // const {setFieldDecorator} = this.props.form
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
          }
        const tailLayout = {
            wrapperCol: { offset: 4, span: 16 },
          };
        return (
            <div className="site-card-border-less-wrapper">
                <Card 
                    title="编辑文章" 
                    bordered={false} 
                    extra={<Button onClick={this.dontSetEdit}>取消</Button>}
                >
                    <Spin spinning={this.state.loading}>
                       <Form
                        ref={this.formRef}
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.submitAtricle}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="author"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                            name="amount"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="更改时间"
                            name="createAt"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <DatePicker showTime/>
                        </Form.Item>
                        <Form.Item 
                            label="文本编辑"
                            name="content"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <div ref={this.editorRef} className="edit-index" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                确认修改
                            </Button>
                        </Form.Item>
                    </Form>
                    </Spin>                
                </Card>
            </div>
        )
    }
}



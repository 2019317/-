import React, { Component,createRef } from 'react'
import { Button, Card,Form, Input, DatePicker } from 'antd'
import E from 'wangeditor'


import './Edit.less'

export default class Edit extends Component {
    formRef = createRef();
    constructor () {
        super()
        this.editorRef = createRef()
    }
    dontSetEdit = () => {
        console.log(this.props)
    }
    submitAtricle = (value) => {
        console.log(value)
    }
    initEditor = () => {
        // const [form] = Form.useForm()
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
                    <Form
                        ref={this.formRef}
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.submitAtricle}
                    >
                        <Form.Item
                            label="标题"
                            name="username"
                            rules={[{ required: true, message: '这是必选项' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="auther"
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
                            name="creatAt"
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
                </Card>
            </div>
        )
    }
}



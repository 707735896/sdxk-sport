<template>
    <div class="functionalManage">
        <div class="content-box">
            <div class="title">通知管理</div>
            <Form ref="formInline" :model="formInline" inline>
                <FormItem label="日期" :label-width="50">
                    <DatePicker type="date" style="width: 180px" placeholder="请选择"
                                v-model="searchList.send_date"></DatePicker>
                </FormItem>
                <FormItem label="关键字" :label-width="72">
                    <Input type="text" v-model="searchList.keyword" style="width: 180px"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <div class="add" @click="add">
                    <img src="../../assets/system/role/add.png"/>
                    新建文件
                </div>
                <div class="add" @click="trash">
                    <img src="../../assets/system/role/delete.png"/>
                    删除
                </div>
            </div>
            <BaseTable ref="selection" :columns="columns" :data="data" @on-selection-change="selectionChange"></BaseTable>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current="pageConfig.page"
                  :page-size-opts="pageConfig.opts"
                  :page-size="pageConfig.size"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>
        <!-- 新增修改 -->
        <Modal
                class="functionalAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='800'
                :styles="{top: '100px'}">
            <Form :model="addForm" label-position="top" ref="addForm" :rules="rules">
                <!--<Row>-->
                <!--<Col span="12" class="leftFormItem">-->
                <!--<FormItem label="收件人" prop="received_by">-->
                <!--<Select v-model="addForm.received_by" multiple filterable style="width: 744px">-->
                <!--<Option v-for="item in userList" :value="item.id" :key="item.id">-->
                <!--{{ item.real_name }}-->
                <!--</Option>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--</Col>-->
                <!--</Row>-->
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="标题" prop="title">
                            <Input v-model="addForm.title" class="functionalName" style="width: 360px"/>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem start_time">
                        <FormItem label="开始时间" prop="start_time" style="margin-left: 8px;">
                            <DatePicker type="date" placeholder="Select date" style="width: 178px"
                                        v-model="addForm.start_time"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem end_time">
                        <FormItem label="结束时间" style="margin-left: 8px;" prop="end_time">
                            <DatePicker type="date" placeholder="Select date" style="width: 178px"
                                        v-model="addForm.end_time"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="内容" prop="content">
                            <Input type="textarea" v-model="addForm.content" class="functionalName"
                                   style="width: 768px;"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Upload :action="action" :max-size="10240" name="uploadFile" :data="fileType "
                                :on-success="handleSuccess"
                                :headers="headers"
                                :format="['jpg','doc','docx','xls','xlsx','ppt','pptx','pdf']"
                                :on-format-error="handleFormatError"
                                ref="upload"
                                :on-exceeded-size="exceededSize"
                        >
                            <i-button class="btn-upload">上传文件</i-button>
                            <span style="margin-left: 9px">支持<span style="color: #D81717;">jpg、doc、docx、xls、xlsx、ppt、pptx、pdf</span>文件不得超过<span
                                    style="color: #D81717;">10M</span></span>
                        </Upload>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>
        <!--详情-->
        <Modal
                class="functionalAddModal"
                :title="addtitle"
                v-model="infoModal"
                :mask-closable="false"
                width='800'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <!--<Row>-->
                <!--<Col span="12" class="leftFormItem">-->
                <!--<FormItem label="收件人">-->
                <!--<Input v-model="addForm.received_by" class="functionalName" style="width: 744px" disabled/>-->
                <!--</FormItem>-->
                <!--</Col>-->
                <!--</Row>-->
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="标题">
                            <Input v-model.trim="addForm.title" class="functionalName" style="width: 360px" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem">
                        <FormItem label="开始时间" style="margin-left: 8px;">
                            <DatePicker type="date" placeholder="Select date" style="width: 178px"
                                        v-model="addForm.start_time" disabled></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem">
                        <FormItem label="结束时间" style="margin-left: 8px;">
                            <DatePicker type="date" placeholder="Select date" style="width: 178px"
                                        v-model="addForm.end_time" disabled></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24" class="leftFormItem">
                        <FormItem label="内容">
                            <Input type="textarea" v-model.trim="addForm.content" class="functionalName"
                                   style="width: 768px;" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <a :href=addForm.accessorys target="_blank">
                            <div style="margin: 0 0 60px 0;font-size: 14px;font-weight: 700;color: #FF7200"
                                 v-text="addForm.accessorysName">
                            </div>
                        </a>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        props: [''],
        data() {
            return {
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                searchList: {
                    // user_name:'',
                    // real_name:'',
                    // type:'',
                    // phone:'',
                    // mail:'',
                    keyword: null,
                    send_date: null
                },
                action: urls.uploadImage,
                fileType: {
                    filetype: 3
                },
                headers:{
                    AuthToken: sessionStorage.getItem('token')
                },
                userList: [],
                addModal: false,
                infoModal: false,
                rightModal: false,
                addtitle: '',
                formInline: {
                    functionalName: '',
                    status: ''
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index'
                    },
                    {
                        title: '日期',
                        width: 150,
                        key: 'send_date'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '发布内容',
                        key: 'content'
                    },
                    {
                        title: '开始时间',
                        width: 150,
                        key: 'start_time'
                    },
                    {
                        title: '结束时间',
                        width: 150,
                        key: 'end_time'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../assets/system/role/info.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginLeft: '5px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.info(params.row);
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                addForm: {
                    received_by: '',
                    title: '',
                    start_time: '',
                    end_time: '',
                    content: '',
                    accessorys: '',
                    accessorysName: ''
                },
                rules: {
                    received_by: [{
                        required: true,
                        message: '请选择收件人',
                        trigger: 'change',
                        type: 'array'
                    }],
                    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
                    start_time: [{required: true, message: '请输入开始时间', trigger: 'blur', type: 'date'}],
                    end_time: [{required: true, message: '请输入结束时间', trigger: 'blur', type: 'date'}],
                    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
                },
                selectionValue: [],
            };
        },
        methods: {
            pageChange(page) {
                this.pageConfig.page = page;
                this.getList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            add() {
                this.addtitle = '新建文件';
                this.addModal = true;
                this.addForm = {};
                this.$refs.upload.clearFiles();
                this.$ajax({
                    url: urls.user_all,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.userList = data.data;

                    } else {

                    }
                }).catch(err => {

                });
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的通知');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除通知？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.task_operation,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除通知成功');
                                    self.getList();
                                } else {
                                    self.$Message.error('删除通知失败');
                                }
                            })
                    },
                    cancel: function () {
                        self.getList();
                    }
                });
            },
            setRight() {
                // this.rightModal = true;
                this.addtitle = '权限配置';
                this.addModal = true;
            },
            Search() {
                this.pageConfig.page = 1;
                this.getList();
            },
            info(row) {
                this.addtitle = '详情';
                this.infoModal = true;
                this.addForm.title = row.title;
                this.addForm.received_by = row.received_by;
                this.addForm.accessorysName = this.getNameFromUrl(row.accessorys);
                this.addForm.accessorys = row.accessorys;
                this.addForm.content = row.content;
                this.addForm.start_time = row.start_time;
                this.addForm.end_time = row.end_time;
            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (new Date(this.addForm.start_time).getTime() > new Date(this.addForm.end_time).getTime()) {
                        this.$Message.error('开始时间不能大于结束时间！');
                        return false;
                    }

                    this.$ajax({
                        url: urls.task_add,
                        data: {
                            title: this.addForm.title,
                            // received_by: this.addForm.received_by.join(','),
                            content: this.addForm.content,
                            accessorys: this.addForm.accessorys,
                            start_time: new Date(this.addForm.start_time).getTime(),
                            end_time: new Date(this.addForm.end_time).getTime()
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success('新增成功');
                            this.$emit('modal-close', true);
                            // this.data = data.data;
                            // this.pageConfig.total = data.totalRecords;
                            this.getList();
                            this.addForm = {};
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    }).catch(err => {

                    });
                    this.addModal = false;
                })

            },
            handleSuccess(res) {
                if (res.code === 0) {
                    this.addForm.accessorys = res.url;
                } else {
                    this.$Message.error(res.error);
                }
            },
            handleFormatError() {
                this.$Message.error('文件类型错误，请上传类型是jpg、doc、docx、xls、xlsx、ppt、pptx、pdf的文件!');
            },
            exceededSize() {
                this.$Message.error('上传文件过大，请重新上传!');
            },
            closeRightModal() {
                this.rightModal = false;
            },
            confirmRightModal() {
                this.rightModal = false;
            },
            deletefunctional() {
                let messageWarning = '是否启用该功能？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert('删除');
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            getList() {
                this.selectionValue = [];
                this.$ajax({
                    url: urls.task_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        keyword: this.searchList.keyword,
                        send_date: new Date(this.searchList.send_date).getTime()
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            getNameFromUrl(url) {
                if (url) {
                    var strArray = url.split('/');
                    var ensourceNameArr = strArray[strArray.length - 1].split('.');
                    var type = ensourceNameArr[ensourceNameArr.length - 1];
                    var ensourceName = strArray[strArray.length - 1].replace('.' + type, '')
                    var name = ensourceName.substring(0, ensourceName.length - 14);
                    return name + '.' + type;
                } else {
                    return "暂无附件";
                }
            }
        },
        watch: {//处理表单验证提示信息
            addModal(newValue) {
                if (!newValue) {
                    this.$refs['addForm'].resetFields();
                    this.addForm = {};
                }
            }
        },
        mounted() {
            this.getList();
        },
    };
</script>
<style lang="scss">

    .start_time {
        .ivu-form-item-error-tip {
            left: 10px;
            top: 32px;
        }
    }

    .end_time {
        .ivu-form-item-error-tip {
            left: 10px;
            top: 32px;
        }
    }

    .ivu-date-picker-cells-cell:hover em {
        background: rgba(255, 114, 0, 0.2) !important;
    }

    .ivu-date-picker-cells-cell-today em:after {
        background: #FF7200 !important;
    }

    .ivu-date-picker-cells-cell-selected em {
        background: #FF7200;
        color: #fff;
    }

    .ivu-date-picker-cells-focused em {
        box-shadow: inset 0 0 0 1px #FF7200;
    }

    .ivu-date-picker-cells-cell-range:before {
        content: "";
        display: block;
        background: rgba(255, 114, 0, 0.2) !important;
        border-radius: 0;
        border: 0;
        position: absolute;
        top: 2px;
        bottom: 2px;
        left: 0;
        right: 0;
    }

    .functionalAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
            float: initial !important;
        }
        .ivu-date-picker {
            float: right;
        }
        .ivu-modal-body {
            .leftFormItem {
                //width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                width: 266px;
                .ivu-input {
                    width: 200px;
                }
            }
        }
        .ivu-modal-footer {
            display: none;
        }

        .btn-upload {
            width: 89px;
            height: 32px;
            background: rgba(61, 125, 120, 1);
            border-radius: 4px;
            border: none;
            font-size: 14px;
            color: rgba(234, 249, 248, 1);
        }
    }

    .functionalRightModal {
        margin-top: 16px;
        .rightForm {
            .rightFormLeft {
                float: left;
                width: 234px;
                .labelNameLeft {
                    font-size: 30px;
                    font-family: SourceHanSansCN-Medium;
                    font-weight: 500;
                    color: rgba(1, 19, 17, 1);
                }
            }
            .rightFormRight {
                float: right;
                width: 337px;
                height: 315px;
                overflow: auto;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

</style>

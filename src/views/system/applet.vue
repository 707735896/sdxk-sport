<template>
    <div class="user">
        <div class="content-box">
            <div class="title">小程序用户管理</div>
            <Form ref="formInline" :model="searchList" inline>
                <FormItem label="手机号" :label-width="58">
                    <i-input type="text" :maxlength="11" v-model.trim="searchList.phone_number" clearable/>
                </FormItem>
                <FormItem label="姓名" :label-width="42">
                    <i-input v-model.trim="searchList.user_name" clearable/>
                </FormItem>
                <FormItem label="性别" :label-width="80">
                    <i-select style="width:140px" v-model="searchList.gender">
                        <Option value="-1">全部</Option>
                        <Option :value="1">男</Option>
                        <Option :value="2">女</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <!-- <div class="action-btn" @click="exports">
                  <img style="margin: 8px 6px;" src="../../assets/system/role/add.png" alt="新增用户">
                  导出
                </div> -->
                <div class="add" @click="resetUser">
                    <img style="margin: 0 6px;" src="../../assets/system/reset.png" alt="重置密码"/>
                    重置密码
                </div>
            </div>
            <BaseTable
                ref="myTable"
                :columns="columns"
                :data="data"
                @on-selection-change="selectionChange"
            ></BaseTable>

            <Page
                style="text-align: center;margin-top: 20px;"
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
        <!--新增/编辑 -->
        <Modal
            :title="addtitle"
            v-model="addModal"
            :mask-closable="false"
            :footer-hide="true"
            width='500'
            class="appletUserAddModal"
            :styles="{top: '100px'}"
        >
            <Form :model="addForm" label-position="top" :rules="rules" ref="addForm">
                <Row>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="姓名">
                            <i-input v-model="addForm.user_name" disabled></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="rightFormItem">
                        <FormItem label="性别" prop="gender">
                            <i-select style="width:200px" v-model="addForm.gender" @on-change="sexChange">
                                <i-option value="1">男</i-option>
                                <i-option value="2">女</i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="手机号">
                            <i-input v-model="addForm.phone_number" disabled></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="rightFormItem">
                        <FormItem label="工作类型">
                            <i-input v-model="addForm.work_type"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="与孩子关系" prop="relation">
                            <i-select style="width:200px" v-model="addForm.relation" @on-change="typeChange">
                                <i-option value="1">爸爸</i-option>
                                <i-option value="2">妈妈</i-option>
                                <i-option value="3">爷爷</i-option>
                                <i-option value="4">奶奶</i-option>
                                <i-option value="5">其他</i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type="default" @click="closeaddModal">取消</i-button>
                <i-button class="confirm" type="primary" @click="confirmEditModal">保存</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../service/Urls';

    export default {
        name: 'applet',
        data() {
            //   手机号码验证
            let validateMobilePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不可为空'));
                } else {
                    if (value !== '') {
                        let reg = /^1[3456789]\d{9}$/;
                        if (!reg.test(value)) {
                            callback(new Error('请输入有效的手机号码'));
                        }
                    }
                    callback();
                }
            };
            return {
                searchList: {
                    user_name: null,
                    phone_number: null,
                    gender: '-1'
                },
                addModal: false,
                addtitle: '',
                addForm: {
                    user_name: '',
                    phone_number: '',
                    work_type: '',
                    gender: 1,
                    relation: ''
                },
                rules: {
                    gender: [{required: true, message: '请选择性别', trigger: 'change'}],
                    relation: [
                        {required: true, message: '请选择与孩子关系', trigger: 'change'}
                    ],
                    phone_number: [
                        {required: true, validator: validateMobilePhone, trigger: 'blur'}
                    ]
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 70,
                        type: 'index'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                            return h('span', null, params.row.sex === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '手机号',
                        key: 'phone_num'
                    },
                    {
                        title: '工作类型',
                        key: 'work_type'
                    },
                    {
                        title: '与孩子关系',
                        key: 'remark',
                        render: (h, params) => {
                            return h(
                                'span',
                                null,
                                params.row.remark === '1'
                                    ? '爸爸'
                                    : params.row.remark === '2'
                                    ? '妈妈'
                                    : params.row.remark === '3'
                                        ? '爷爷'
                                        : params.row.remark === '4'
                                            ? '奶奶'
                                            : '其他'
                            );
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(
                                                params.row.id,
                                                params.row.status,
                                                params.row.name
                                            );
                                        }
                                    }
                                }),
                                h('span', null, params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editUser(params.row);
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
                                                this.editUser(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                selectionValue: [],
                checkedList: {},
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                id: null

            };
        },
        methods: {
            // // 新增用户
            // addUser() {
            //   this.addtitle = "编辑用户";
            //   this.addModal = true;
            //   this.addForm = {};
            // },
            // 编辑用户
            editUser(row) {
                this.addtitle = '编辑用户';
                this.addModal = true;
                this.id = row.id;
                this.addForm.user_name = row.name;
                this.addForm.phone_number = row.phone_num;
                this.addForm.work_type = row.work_type;
                this.addForm.gender = String(row.sex);
                this.addForm.relation = row.remark;
            },
            closeaddModal() {
                this.addModal = false;
            },
            // 确认提交
            confirmEditModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    var datas = {};
                    // 编辑用户
                    if (this.id) {
                        let userinfo = {
                            id: this.id,
                            name: this.addForm.user_name,
                            work_type: this.addForm.work_type,
                            remark: this.addForm.relation,
                            phone_num: this.addForm.phone_number,
                            sex: this.addForm.gender * 1
                        };
                        datas.userinfo = userinfo;
                        this.$ajax({
                            url: urls.applet_update,
                            data: datas.userinfo
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('编辑用户成功');
                                this.$emit('modal-close', true);
                                this.getAppletUserList();
                                this.addForm = {};
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        });
                        this.addModal = false;
                    }
                    // else {
                    // // 新增用户
                    //   let userinfo = {
                    //     name: this.addForm.user_name,
                    //     work_type: this.addForm.work_type,
                    //     remark: this.addForm.relation,
                    //     phone_num: this.addForm.phone_number,
                    //     sex: this.addForm.gender * 1
                    //   };
                    //   datas.userinfo = userinfo;
                    //   this.$ajax({
                    //     url: urls.applet_add,
                    //     data: datas.userinfo
                    //   }).then(data => {
                    //     if (data.code === 200) {
                    //       this.$Message.success("新增用户成功");
                    //       this.$emit("modal-close", true);
                    //       this.getAppletUserList();
                    //       this.addForm = {};
                    //     } else {
                    //       this.data = [];
                    //       this.pageConfig.total = 0;
                    //     }
                    //   });
                    //   this.addModal = false;
                    // }
                });
            },
            // 监听remark改变
            typeChange() {
                if (this.addForm.relation == '1' || this.addForm.relation == '3') {
                    this.addForm.gender = '1';
                } else if (this.addForm.relation == '2' || this.addForm.relation == '4') {
                    this.addForm.gender = '2';
                }
            },
            sexChange() {

            },

            // 启用禁用
            switch(id, status, name) {
                let data = {};
                let text = '',
                    msg1 = '',
                    msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该用户？';
                    msg1 = '禁用' + name + '用户成功';
                    msg2 = '禁用' + name + '用户失败';
                } else {
                    data.status = 1;
                    text = '确定启用该用户？';
                    msg1 = '启用' + name + '用户成功';
                    msg2 = '启用' + name + '用户失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.applet_status,
                                data: {
                                    id: id
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success(msg1);
                                    self.getAppletUserList();
                                } else {
                                    self.$Message.error(msg2);
                                }
                            });
                    },
                    cancel: function () {
                        self.data = [];
                        self.getAppletUserList();
                    }
                });
            },
            // 表格多选
            selectionChange(value) {
                // this.exportData = value;
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            // 重置密码
            resetUser() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要重置的用户');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定重置密码？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.applet_reset,
                                data: {
                                    ids: self.selectionValue
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('重置密码成功');
                                    self.getAppletUserList();
                                } else {
                                    self.$Message.error('重置密码失败');
                                }
                            });
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            // 查询
            Search() {
                this.pageConfig.page = 1;
                this.getAppletUserList();
            },
            // 小程序用户列表
            getAppletUserList() {
                this.$ajax({
                    url: urls.applet_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        name: this.searchList.user_name,
                        phonenum: this.searchList.phone_number,
                        sex: this.searchList.gender === '-1' ? -1 : this.searchList.gender
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.data = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            // 分页搜索
            pageChange(page) {
                this.pageConfig.page = page;
                this.getAppletUserList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },

            checkboxChange(checked_id) {
                this.checkedList[checked_id]
                    ? this.$delete(this.checkedList, checked_id)
                    : this.$set(this.checkedList, checked_id, true);
            }
        },
        watch: {
            //处理表单验证提示信息
            addModal(newValue) {
                if (!newValue) {
                    this.$refs['addForm'].resetFields();
                    this.addForm = {};
                }
            }
        },
        mounted() {
            this.getAppletUserList();
        }
    };
</script>
<style lang="scss">
    .appletUserAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }

        .ivu-modal-body {
            .leftFormItem {
                margin-left: 18px;
                width: 200px;

                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }

            .rightFormItem {
                margin-left: 36px;
                width: 200px;
            }

            .ivu-col-span-12 {
                display: inline-block;
                float: none;
            }

            .checkAreaGroup {
                margin-left: 62px;
                width: 526px;

                .checkArea {
                    .check-box {
                        margin: 10px 20px 0;
                        padding: 0;
                        width: 18px;
                        /*height: 18px;*/
                        /*background-color: white;*/
                        cursor: pointer;
                    }

                    img {
                        position: absolute;
                        top: 15px;
                        left: 34px;
                        pointer-events: none;
                    }

                    .ivu-checkbox-inner {
                        display: none;
                    }

                    width: 526px;
                    height: 256px;
                    overflow-y: auto;

                    .per-item {
                        position: relative;
                        width: 80px;
                        height: 73px;
                        margin-right: 9px;
                        text-align: center;
                        color: #021D21;
                        font-size: 14px;
                        margin-top: 8px;
                        display: inline-block;
                    }

                    .per-item-odd {
                        @extend .per-item;
                        background-color: #F0EFDF;
                    }

                    .per-item-even {
                        @extend .per-item;
                        background-color: #BBDFDF;
                    }
                }
            }
        }
    }
</style>


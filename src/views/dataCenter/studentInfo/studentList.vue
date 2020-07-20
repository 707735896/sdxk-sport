<template>
    <div class="students content-box">
        <h3 class="title">学生信息管理</h3>
        <Form class="clearfix search-form" inline label-position="left">
            <FormItem label="学校名称" :label-width="70">
                <i-select v-model="req.dep_id" filterable style="width:150px" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学生姓名" :label-width='70'>
                <i-input v-model.trim="req.name" style="width:100px" :maxlength="20"></i-input>
            </FormItem>
            <!--<FormItem label="学号" :label-width='40'>-->
            <!--<i-input v-model.trim="req.stu_num" style="width:100px" :maxlength="9"></i-input>-->
            <!--</FormItem>-->
            <FormItem label="性别" :label-width="40">
                <i-select v-model="req.gender" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">男</i-option>
                    <i-option :value="2">女</i-option>
                </i-select>
            </FormItem>
            <FormItem label="户籍类型" :label-width="70">
                <i-select v-model="req.household_type" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">城镇</i-option>
                    <i-option :value="2">农村</i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否住宿" :label-width="70">
                <i-select v-model="req.is_boarding" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">是</i-option>
                    <i-option :value='2'>否</i-option>
                </i-select>
            </FormItem>

            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <!--学校管理员才有 增加，导入按钮-->
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" @click="add" v-if="is_student_manage">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
            <!--:max-size="1024"-->
            <Upload :action="uploadUrl" class="add"
                    v-if="is_student_manage"
                    :show-upload-list="false"
                    name="uploadFile"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                    :format="['xls','xlsx']"
                    :headers="header"

                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize">
                <img src="../../../assets/unit/import.png" alt="download">&nbsp;导入
            </Upload>
            <!--<a href="javascript:void(0)" class="add" style="margin-right: 45px;" @click="imports">-->
            <!--<img src="../../../assets/unit/import.png" alt="download">&nbsp;导入-->
            <!--</a>-->
            <!--<a href="javascript:void(0)" class="add">-->
            <!--<img src="../../../assets/unit/export.png" alt="download">&nbsp;导出-->
            <!--</a>-->
            <a :href="student_down" class="add" style="position: absolute;right: 50px" download="学生信息导入模板.xlsx">
                <img src="../../../assets/unit/download.png" alt="download">&nbsp;<span
                style="position: relative;top:-4px;">下载模版</span>
            </a>
        </div>
        <BaseTable center :disabled-hover='true' :columns="columns" :data="tableData"
               :row-class-name='rowClass'></BaseTable>
        <div class="page">
            <Page
                :total="pageConfig.total"
                show-total
                show-elevator
                show-sizer
                :current='pageConfig.page'
                :page-size-opts='pageConfig.opts'
                :page-size='pageConfig.size'
                @on-change='pageChange'
                @on-page-size-change='sizeChange'/>
        </div>

        <Spin size="large" fix v-if="spinShow"></Spin>

        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import EditStudent from './editStudent';
    import importStudent from './importStudent';
    import urls from '@/service/Urls';
    import {dateFormatFromString} from '@/libs/dateUtils';

    export default {
        name: 'StudentList',
        data() {
            return {
                spinShow: false,
                student_down: urls.student_down,
                req: {
                    dep_id: '-1',
                    name: '',
                    household_type: '-1',
                    gender: '-1',
                    is_boarding: '-1'
                },
                columns: [
                    {
                        width: 20,
                        title: ' ',
                        fixed: 'left'
                    },
                    {
                        type: 'index',
                        width: 50,
                        title: '序号',
                        fixed: 'left'
                    },
                    {
                        title: '学校名称',
                        key: 'school_name',
                        width: 150
                    },
                    {
                        title: '学籍号',
                        key: 'code',
                        width: 180
                    },
                    // {
                    //     title: '学号',
                    //     width: 100,
                    //     key: 'stu_num'
                    // },
                    {
                        title: '姓名',
                        width: 90,
                        key: 'name'
                    },
                    {
                        title: '性别',
                        width: 50,
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '民族',
                        width: 80,
                        key: 'nation'
                    },
                    {
                        title: '户籍类型',
                        key: 'household_type',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.household_type === 1 ? '城镇' : '农村');
                        }
                    },
                    {
                        title: '是否住宿',
                        key: 'is_boarding',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.is_boarding == 1 ? '是' : '否');
                        }
                    },
                    {
                        title: '证件类型',
                        width: 90,
                        key: 'card_type',
                        render: (h, params) => {
                            return h('span', null, params.row.card_type === 1 ? '身份证' : '护照');
                        }
                    },
                    {
                        title: '证件号',
                        width: 180,
                        key: 'card_num'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        width: 110,
                        render: (h, params) => {
                            if (params.row.birthday) {
                                return h('span', null, dateFormatFromString(params.row.birthday.replace(/\./g, '/')).replace(/\//g, '.'));
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '第一监护人(手机号)',
                        width: 180,
                        key: 'guardian1'
                    },
                    {
                        title: '第二监护人(手机号)',
                        width: 180,
                        key: 'guardian2'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '4px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.status, params.row.name);
                                        }
                                    }
                                }),
                                h('span', null, params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 180,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.infos(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/unit/infos.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '详情')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '0'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/unit/edit_cover.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '编辑')
                                ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                typeList: [],
                uploadUrl: urls.student_import,
                yearList: [],
                areaList: [],
                schoolList: [],
                modalTitle: '',
                flag: false,
                id: '',
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                header: {
                    'AuthToken': sessionStorage.getItem('token'),
                },
                is_manage: true,
                is_student_manage: false
            };
        },
        methods: {
            getSelectCondition() {
                // 学校
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter(item => item.type === 2);
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            handleBeforeUpload(file) {
                // if (file.size / 1024 / 1024 > 1) {
                //
                // }
                this.$Spin.show();
                return true;
            },
            handleSuccess(res) {
                this.$Spin.hide();
                if (res.code === 200) {
                    this.$Message.success('导入成功');
                    this.search();
                } else {
                    this.$Message.error(res.msg || res.error);
                }
            },
            handleFormatError() {
                this.$Spin.hide();
                this.$Message.error('请选择excel类型的文件');
            },
            handleMaxSize() {
                this.$Spin.hide();
                // this.$Message.warning('文件大小限制在1M以内');
            },
            areaChange() {
                this.req.school_id = -1;
                this.getSchoolList();
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                const {dep_id, name, household_type, gender, is_boarding} = this.req;
                const {page, size} = this.pageConfig;

                let json = {
                    page: page,
                    size: size,
                    dep_id: dep_id === '-1' ? null : dep_id,
                    name: name,
                    household_type: household_type === '-1' ? null : household_type,
                    gender: gender === '-1' ? null : gender,
                    is_boarding: is_boarding === '-1' ? null : is_boarding
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.pageConfig.total = 0;
                });
            },
            add() {
                this.com = EditStudent;
                this.id = '';
                this.modalTitle = '新增';
                this.flag = false;
            },
            imports() {
                this.com = importStudent;
                this.id = '';
                this.modalTitle = '';
                this.flag = '';
            },
            infos(id) {
                this.com = EditStudent;
                this.id = id;
                this.modalTitle = '详情';
                this.flag = true;
            },
            edit(id) {
                this.com = EditStudent;
                this.id = id;
                this.modalTitle = '编辑';
                this.flag = false;
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该学生？';
                    msg1 = '禁用' + name + '学生成功';
                    msg2 = '禁用' + name + '学生失败';
                } else {
                    data.status = 1;
                    text = '确定启用该学生？';
                    msg1 = '启用' + name + '学生成功';
                    msg2 = '禁用' + name + '学生失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.student_status,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.search();
                            } else {
                                self.$Message.error(msg2);
                                self.search();
                            }
                        }).catch(() => {
                            self.$Message.error(msg2);
                            self.search();
                        });
                    },
                    cancel: () => {
                        self.tableData = [];
                        self.search();
                    }
                });
            },
            rowClass(row) {
                return row.status === 0 ? 'disabled' : '';
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            let roleCode = sessionStorage.getItem('roleCode');
            if (roleCode !== '999') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            if (roleCode === '10201001') {
                this.is_student_manage = true;
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>

<style lang="less">
    .students {
        .disabled span {
            color: #ccc;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
    }
</style>

<template>
    <div class="classes content-box">
        <h3 class="title">班级信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="学校名称" :label-width="70">
                <i-select v-model="req.dep_id" filterable  style="width:150px" @on-change="schoolChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <!--<FormItem label="学年" :label-width="50">-->
                <!--<i-select style="width:120px" v-model="req.year">-->
                    <!--<Option value="-1">全部</Option>-->
                    <!--<i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>-->
                <!--</i-select>-->

                <!--&lt;!&ndash;<DatePicker type="daterange" format="yyyy" split-panels v-model="req.year" placement="bottom-end"&ndash;&gt;-->
                <!--&lt;!&ndash;style="width: 140px"></DatePicker>&ndash;&gt;-->
            <!--</FormItem>-->
            <!--<FormItem label="学期" :label-width="50">-->
                <!--<i-select v-model="req.term" style="width:120px">-->
                    <!--<i-option value="-1">全部</i-option>-->
                    <!--<i-option :value="1">第一学期</i-option>-->
                    <!--<i-option :value="2">第二学期</i-option>-->
                <!--</i-select>-->
            <!--</FormItem>-->
            <FormItem label="年级" :label-width="40">
                <i-select v-model="req.grade_no" style="width:160px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40">
                <i-input v-model.trim="req.class_no" :maxlength="20" style="width:120px"></i-input>
            </FormItem>
            <FormItem label="老师类型" :label-width="70">
                <i-select v-model="req.type" style="width:100px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option :value='1'>班主任</i-option>
                    <i-option :value='2'>体育老师</i-option>
                </i-select>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a v-if="!is_school_manage" href="javascript:void(0)" class="add" @click="add" style="margin-right: 45px;">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
            <!--<a href="javascript:void(0)" class="add" @click="imp">-->
                <!--<img src="../../../assets/unit/import.png" alt="download">&nbsp;导入-->
            <!--</a>-->

             <!-- :max-size="10240" -->
            <Upload
                    class="add"
                    v-if="!is_school_manage"
                    ref="upload"
                    name="uploadFile"
                    :headers="{AuthToken: token}"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['xls','xlsx']"
                    :before-upload="beforeUpload"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :action="uploads"
                    style="display: inline-block;cursor: pointer;">
                <div>
                    <img src="../../../assets/unit/import.png" alt="download" style="position: relative;top: 4px;">&nbsp;导入
                </div>
            </Upload>

            <a :href="class_down" download="班级信息导入模板.xlsx" class="add" style="position: absolute;right: 50px">
                <img src="../../../assets/unit/download.png" alt="download">
                &nbsp;<span style="position: relative;top: -4px;">下载模版</span>
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

        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import AddClass from './addClass';
    import ImportClass from './importClass'
    import urls from '@/service/Urls';
    // import {yearLists} from "@/libs/dateUtils";

    export default {
        name: 'ClassList',
        data() {
            return {
                token: sessionStorage.getItem('token'),
                class_down: urls.class_down,
                uploads: urls.class_import,
                req: {
                    dep_id: '-1',
                    // year: '-1',
                    // term: '-1',
                    grade_no: '-1',
                    // year_action: '',
                    // year_end: '',
                    class_no: '',
                    type: '-1'
                },
                columns: [],
                colum1: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 70
                    },
                    {
                        title: '学校名称',
                        key: 'dep_id'
                    },
                    // {
                    //     title: '学期',
                    //     key: 'term',
                    //     render: (h, params) => {
                    //         return h('span', null, params.row.term === 1 ? '第一学期' : '第二学期');
                    //     }
                    // },
                    // {
                    //     title: '学年',
                    //     key: 'year',
                    //     render(h, params) {
                    //         return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                    //     }
                    // },
                    {
                        title: '年级',
                        key: 'grade_no'
                    },
                    {
                        title: '班级名称',
                        key: 'class_no'
                    },
                    {
                        title: '班主任',
                        key: 'class_teacher'
                    },
                    {
                        title: '体育老师',
                        key: 'physical_teacher'
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
                                        marginRight: '8px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.class_no, params.row.status);
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
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer'
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
                                        src: require('@/assets/unit/edit_cover.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                tableData: [],
                schoolList: [],
                yearList: [],
                gradeList: [],
                // classList: [],
                is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                is_school_manage: false,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                }
            };
        },
        methods: {
            beforeUpload(file){
                this.$Spin.show();
                // if(file.size/1024/1024>1){

                // }
                return true
            },
            handleSuccess (res, file) {
                this.$Spin.hide();
                if(res.code === 200){
                    this.$Message.success('导入成功');
                    this.search();
                }else {
                    this.$Message.error(res.error);
                }
            },
            handleFormatError (file) {
                this.$Spin.hide();
                this.$Message.error('请选择excel类型的文件');
            },
            handleMaxSize (file) {
                this.$Spin.hide();
                // this.$Message.error('文件大小应小于1M');
            },
            getSelectCondition() {
                // this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);
                            if(!this.is_manage){
                                this.schoolChange(this.req.dep_id);
                            }

                        } else {
                            this.schoolList = [];
                        }
                    })
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                if(this.req.type === '-1'){
                    this.columns = this.colum1.slice();
                }else if(this.req.type === 1){
                    this.columns = this.colum1.filter((item, index) => index !== 6)
                }else if(this.req.type === 2){
                    this.columns = this.colum1.filter((item, index) => index !== 5)
                }

                const {page,size} = this.pageConfig;
                const {class_no, dep_id, grade_no } = this.req;

                this.$ajax({
                    url: urls.class_list,
                    data: {
                        page: page,
                        size: size,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        // year_action: this.req.year === '-1' ? null : Number(this.req.year.substr(0, 4)),
                        // year_end: this.req.year === '-1' ? null : Number(this.req.year.substr(5, 4)),
                        // year: this.req.year === '-1' ? null : this.req.year,
                        // term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        class_no: class_no ? class_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }, err => {
                    this.tableData = [];
                })
            },
            add() {
                this.com = AddClass;
                this.id = '';
                this.flag = false;
                this.modalTitle = '新增';
            },
            imp() {
                this.com = ImportClass;
                this.id = '';
                this.flag = false;
                this.modalTitle = '导入';
            },
            edit(id) {
                this.com = AddClass;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            schoolChange(value) {
                this.req.grade_no = "-1";
                if (value === "-1") {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(({id}) => id === value);
                if(!temp.length){
                    return false;
                }
                this.$ajax({
                    url: urls.grade_no_list,
                    data: {
                        garde: temp[0].nature
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }, err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                // this.req.name = '';
                // if (value === '-1') {
                //     this.classList = [];
                //     return false;
                // }
                // this.$ajax({
                //     url: urls.class_all_lists,
                //     data: {
                //         grade_no: value,
                //         dep_id: this.req.school_id,
                //         status: 1
                //     }
                // }).then(data => {
                //     if (data.code === 200) {
                //         this.classList = data.data;
                //     } else {
                //         this.classList = [];
                //     }
                // });
            },
            switch(id, name, status) {
                let data = {};
                let text = '';
                let msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该班级？';
                    msg1 = '禁用' + name + '班级成功';
                    msg2 = '禁用' + name + '班级失败';
                } else {
                    data.status = 1;
                    text = '确定启用该班级？';
                    msg1 = '启用' + name + '班级成功';
                    msg2 = '启用' + name + '班级失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.class_status,
                            data: {
                                'ids': [id],
                                'status': data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.search();
                            } else {
                                self.$Message.error(msg2);
                            }
                        }).catch(() => {
                            self.$Message.error(msg2);
                        });
                    },
                    cancel: () => {
                        self.tableData = [];
                        self.search();
                    }
                });
            },
            rowClass(row) {
                return row.status === 2 ? 'disabled' : '';
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
            this.getSelectCondition();
            this.columns = this.colum1.slice();
            let code = sessionStorage.getItem('roleCode');
            if( code !== '999'){ // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            if(code !== '10201001') { // 学校管理员
                this.is_school_manage = true;
            }
            this.search();
        }
    };
</script>

<style lang="less">
    .classes {
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .disabled span {
            color: #999999;
        }
    }
</style>

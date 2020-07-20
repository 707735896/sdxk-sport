<template>
    <div class="content-box retest">
        <div class="title">校医核实</div>
        <Form class="search-form" inline :label-width="50">
            <FormItem label="年级">
                <i-select style="width:140px" v-model="req.grade_no" @on-change="gradeChange">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="班级">
                <i-select style="width:120px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="学生姓名" :label-width="80">
                <i-input v-model.trim="req.student_name" style="width:120px;"></i-input>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>
        <div class="add" @click="onekey_submit">
            <img alt="print" src="../../../assets/unit/submit.png"/>
            一键提交
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData"></BaseTable>
        <Page style="text-align: center;margin-top: 20px;"
              :total="pageConfig.total"
              show-total
              show-elevator
              show-sizer
              :current='pageConfig.page'
              :page-size-opts='pageConfig.opts'
              :page-size='pageConfig.size'
              @on-change='pageChange'
              @on-page-size-change='sizeChange'/>
        <component :title="modalTitle" :is='com' :plan_code='plan_code' :year='year' :student_code='student_code'
                   :set_id='set_id' :student_id='student_id'
                   :plan_id='plan_id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import physicalReportInfo from '../medicalReport/physicalReportInfo';
    import editTest from './editTest';

    export default {
        name: 'reTest',
        data() {
            return {
                req: {
                    dep_id: '',
                    grade_no: '-1',
                    class_no: '-1',
                    student_name: ''
                },
                set_id: '',
                student_id: '',
                plan_id: '',
                tableData: [],
                columns: [
                    {
                        title: '序号',
                        width: 100,
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        key: 'grade_no'
                    },
                    {
                        title: '班级',
                        key: 'class_no'
                    },
                    {
                        title: '学生姓名',
                        key: 'student_name'
                    },
                    {
                        title: '备注',
                        key: 'reason'
                    },
                    {
                        title: '操作',
                        width: 180,
                        key: 'action',
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
                                            this.edit(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
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
                                    }, '核实')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: 0
                                    },
                                    on: {
                                        click: () => {
                                            this.infos(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
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
                                ])
                            ]);
                        }
                    }
                ],
                com: null,
                plan_code: null,
                year: null,
                student_code: null,
                modalTitle: '',
                flag: false,
                schoolList: [],
                gradeList: [],
                classList: [],
                studentList: [],
                school_sid_Arr: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            getSelectCondition() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);
                            this.schoolChange(this.req.dep_id);
                        } else {
                            this.gradeList = [];
                        }
                    })
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(({id}) => id === value);
                if (!temp.length) {
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
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: value,
                        dep_id: this.req.dep_id,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.retest_list,
                    data: {
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                        student_name: this.req.student_name ? this.req.student_name : null,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.school_sid_Arr = [];
                        this.tableData = res.data;
                        this.pageConfig.total = res.totalRecords;
                        for (let i = 0; i < res.data.length; i++) {
                            let school_sid = res.data[i].school_sid;
                            if (this.school_sid_Arr.indexOf(school_sid) === -1) {
                                this.school_sid_Arr.push(school_sid);
                            }
                        }
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            //一键提交
            onekey_submit() {
                this.$ajax({
                    url: urls.one_key_submission,
                    data: {
                        school_sid: this.school_sid_Arr.join()
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.search();
                        if(data.data){
                            this.$Message.success(data.data);
                        }
                    } else {
                        this.$Message.error(data.error);
                    }
                })
            },
            infos(row) {
                this.plan_code = row.plan_code;
                this.year = row.year;
                this.student_code = row.student_code;
                this.student_id = row.student_id;
                this.flag = true;
                this.modalTitle = '学生健康体检报告详情';
                this.com = physicalReportInfo;
            },
            edit(row) {
                this.com = editTest;
                this.flag = true;
                this.plan_code = row.plan_code;
                this.year = row.year;
                this.student_code = row.student_code;
                this.student_id = row.student_id;
                if (row.info && row.info.length > 0) {
                    this.set_id = row.info[0].set_id;
                }
                this.plan_id = row.plan_id;
                this.modalTitle = '学生健康体检报告核实';
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
            this.req.dep_id = sessionStorage.getItem('dep_id');
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .retest {
        .modal-form .ivu-form-item {
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

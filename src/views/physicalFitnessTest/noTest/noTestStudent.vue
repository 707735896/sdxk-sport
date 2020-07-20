<template>
    <div class="content-box noTestStudent">
        <div class="title">未测学生名单</div>
        <Form class="search-form" v-model="req" inline>
            <FormItem label="学年" :label-width="40">
                <i-select style="width:120px" v-model="req.year">
                    <Option value="-1">全部</Option>
                    <i-option v-for="item of yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学期" :label-width="40">
                <i-select style="width:100px" v-model="req.term">
                    <Option value="-1">全部</Option>
                    <Option :value="1">第一学期</Option>
                    <Option :value="2">第二学期</Option>
                </i-select>
            </FormItem>
            <FormItem label="学校名称" :label-width="70">
                <i-select style="width:150px" :disabled="!is_manage" v-model="req.dep_id" filterable @on-change="schoolChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="40">
                <i-select v-model="req.grade_no" @on-change="gradeChange"
                          style="width:120px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40" style="margin-right: 0!important;">
                <i-select style="width:120px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item of classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="学生姓名" :label-width="70">
                <i-input v-model.trim="req.name" style="width:150px" placeholder="请输入"></i-input>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <div class="clearfix">
            <!--<a href="javascript:void(0)" class="add" @click="prints">-->
            <!--<img alt="add" src="@/assets/unit/add.png">&nbsp;打印名单-->
            <!--</a>-->
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData"></BaseTable>
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
    import urls from '@/service/Urls';
    import {yearLists,todayYear} from "@/libs/dateUtils";
    import noInfo from './noInfo';
    import qs from 'qs';

    export default {
        name: 'noTestStudent',
        data() {
            return {
                req: {
                    name: '',
                    dep_id: '-1',
                    year: todayYear(),
                    term: '-1',
                    grade_no: '-1',
                    class_no: '-1'
                },
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align:'center',
                        // fixed: 'left'
                    },
                    {
                        title: '学校名称',
                        minWidth: 150,
                        key: 'dep_id'
                    },
                    {
                        title: '学年',
                        key: 'year',
                        width: 110,
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '学期',
                        key: 'term',
                        width: 110,
                        render: (h, params) => {
                            if (params.row.term === 1) {
                                return h('span', null, '第一学期');
                            } else if (params.row.term === 2) {
                                return h('span', null, '第二学期');
                            } else {
                                return ''
                            }
                        }
                    },
                    {
                        title: '年级',
                        minWidth: 120,
                        key: 'grade_no'
                    },
                    {
                        title: '班级',
                        minWidth: 120,
                        key: 'class_no'
                    },
                    {
                        title: '学生姓名',
                        minWidth: 120,
                        key: 'student_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.gender === 1) {
                                return h('span', null, '男');
                            } else if (params.row.gender === 2) {
                                return h('span', null, '女');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.age) {
                                return h('span', null, params.row.age);
                            } else if (params.row.card_type === 1) {
                                if (params.row.card_num) {
                                    let year = parseInt(params.row.card_num.substr(6, 4));
                                    let month = parseInt(params.row.card_num.substr(10, 2));
                                    let day = parseInt(params.row.card_num.substr(12, 2));
                                    let d = new Date().getTime() - new Date(year, month, day);
                                    return h('span', null, Math.floor(d / 1000 / 3600 / 24 / 365))
                                }
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '住宿否',
                        key: 'is_boarding',
                        width: 100,
                        render: (h, params) => {
                            if (params.row.is_boarding == 1) {
                                return h('span', null, '是');
                            } else if (params.row.is_boarding === 2) {
                                return h('span', null, '否');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        // fixed: 'right',
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                on: {
                                    click: () => {
                                        this.info(params.row.id);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '4px'
                                    },
                                    attrs: {
                                        src: require('@/assets/unit/infos.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                tableData: [],
                yearList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                selectValue: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                is_manage: true
            };
        },
        methods: {
            getSelectCondition() {
                this.yearList = yearLists().reverse();
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
                            if (!this.is_manage) {
                                this.schoolChange(sessionStorage.getItem('dep_id'));
                            }
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.req.grade_no = "-1";
                this.req.class_no = '-1';
                this.classList = [];
                if (value === "-1") {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    this.gradeList = [];
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
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        grade_no: value
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
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.selectValue = [];
                this.$ajax({
                    url: urls.proofreading_list,
                    data: {
                        fit_status: 99,
                        year: this.req.year === '-1' ? null : this.req.year,
                        term: this.req.term === '-1' ? null : this.req.term,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                        name: this.req.name ? this.req.name : null,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.pageConfig.total = res.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            prints() {
                let data = {};
                if (this.req.name) {
                    data.name = this.req.name
                }
                if (this.req.dep_id !== '-1') {
                    data.dep_id = this.req.dep_id
                }
                if (this.req.year !== '-1') {
                    data.year = this.req.year
                }
                if (this.req.term !== '-1') {
                    data.term = this.req.term
                }
                if (this.req.grade_no !== '-1') {
                    data.grade_no = this.req.grade_no
                }
                if (this.req.class_no !== '-1') {
                    data.class_no = this.req.class_no
                }

                window.location.href = urls.export_no_student + "?" + qs.stringify(data)
            },
            info(id) {
                this.com = noInfo;
                this.id = id;
                this.modalTitle = '详情';
                this.flag = true;
            },
            // selectChange(value) {
            //     this.selectValue = value;
            // },
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
            ModalClose() {
                this.com = null;
            }
        },
        created() {
            if (sessionStorage.getItem('roleCode') !== '999') { // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            } else if (sessionStorage.getItem('roleCode') !== '10201001') { // 学校管理员

            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .noTestStudent {
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

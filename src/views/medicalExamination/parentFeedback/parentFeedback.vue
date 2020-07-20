<template>
    <div>
        <div class="content-box classes">
            <div class="title">
                家长反馈
            </div>
            <Form class="search-form" v-model="filterForm" inline :label-width="72">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="filterForm.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域">
                    <i-select v-model="filterForm.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="filterForm.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称">
                    <i-select v-model="filterForm.school_id" filterable style="width:150px" :disabled="!is_manage"
                              @on-change="schoolChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="44">
                    <Select style="width:120px" v-model="filterForm.grade_no" @on-change="gradeChange">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="班级" :label-width="44" style="margin-right: 0!important;">
                    <i-select style="width:120px" v-model="filterForm.class_no">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;" :label-width="0">
                    <Button type="primary" class="search-btn" @click="getList()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed style="margin-top: 0;"/>
            <BaseTable ref="selection" :columns="columns" :data="objectList"></BaseTable>
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
        <component :title="modalTitle" :is='com' :student_id='student_id'
                   :flag="flag" :general_feedback="general_feedback" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';
    import feedbackInfo from './feedbackInfo';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'schedule',
        data() {
            return {
                modal: false,
                student_id: '',
                plan_id: '',
                plan_code: null,
                student_code: null,
                urls: urls,
                gradeList: [],
                classList: [],
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'school_name'
                    }, {
                        title: '年级',
                        key: 'grade_name'
                    }, {
                        title: '班级',
                        key: 'class_name'
                    }, {
                        title: '学生姓名',
                        key: 'student_name'
                    },
                    {
                        title: '家长反馈',
                        key: 'general_feedback'
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row);
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
                                ])
                            ]);
                        }
                    }
                ],
                objectList: [],
                schoolList: [],
                areaList1: [],
                areaList: [],
                yearList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                com: null,
                modalTitle: '',
                id: '',
                flag: false,
                general_feedback: '',
                is_manage: true,
                filterForm: {
                    page: 1,
                    size: 10,
                    area_id1: '-1',
                    area_id2: '-1',
                    school_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    year: todayYear(),
                },
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
                            if(!this.is_manage){
                                this.schoolChange(this.filterForm.school_id);
                            }
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(item => item.type === 2);
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            schoolChange(value) {
                this.filterForm.grade_no = "-1";
                if (value === "-1") {
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
                this.filterForm.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.filterForm.school_id,
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
            areaChange(value) {
                this.filterForm.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 3 && item.pid === value);
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            getList() {
                let data = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    p_area: this.filterForm.area_id1 === '-1' ? null : this.filterForm.area_id1,
                    c_area: this.filterForm.area_id2 === '-1' ? null : this.filterForm.area_id2,
                    school_id: this.filterForm.school_id === '-1' ? null : this.filterForm.school_id,
                    grade_id: this.filterForm.grade_no === '-1' ? null : this.filterForm.grade_no,
                    class_id: this.filterForm.class_no === '-1' ? null : this.filterForm.class_no,
                    year: this.filterForm.year
                }
                this.$ajax({
                    url: urls.examination_feedback_list,
                    data: data
                }).then((res) => {
                    if (res && res.data) {
                        this.objectList = res.data;
                        this.pageConfig.total = res.totalRecords;
                    }
                });
            },
            info(row) {
                this.com = feedbackInfo;
                this.student_id = row.id;
                this.general_feedback = row.general_feedback;
                this.modalTitle = '反馈详情';
                this.flag = true;
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            this.yearList = yearLists().reverse();
            let code = sessionStorage.getItem('roleCode');
            if(code !== '999'){ // 管理员
                this.is_manage = false;
                this.filterForm.school_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.getList();
        }
    };
</script>
<style lang="scss">
    .modal-form .ivu-form-item {
        margin-right: 30px !important;
    }

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
        .editBtn:hover {
            opacity: 0.8;
        }
    }

</style>

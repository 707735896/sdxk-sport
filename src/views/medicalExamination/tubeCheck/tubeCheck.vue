<template>
    <div class="content-box tubeCheck">
        <div class="title">新生入学结核病检查汇总表</div>
        <Form v-model="req" inline class="search-form">
            <FormItem label="学年" :label-width="40">
                <i-select v-model="req.year" style="width:120px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="所在区域" prop="area_id1" style="width:320px;">
                <i-select v-model="req.area_id1" style="width:110px;" @on-change="areaChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
                <i-select v-model="req.area_id2" style="width:140px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学校名称" :label-width="80">
                <i-select v-model="req.dep_id" filterable style="width:200px" :disabled="!is_manage"
                          @on-change="schoolChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
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
                    <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="学生姓名" :label-width="70">
                <i-input v-model.trim="req.name" style="width:150px" placeholder="请输入"></i-input>
            </FormItem>
            <FormItem label="类别" :label-width="50">
                <i-select v-model="req.cate_id" style="width:90px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in categeryList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="密切接触者" :label-width="90">
                <i-select v-model="req.mqjc_id" style="width:90px">
                    <i-option v-for="item in mqjcList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="可疑症状者" :label-width="90">
                <i-select v-model="req.kyzz_id" style="width:90px">
                    <i-option v-for="item in kyzzList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="PPD试验结果判断" :label-width="130">
                <i-select v-model="req.ppd_id" style="width:90px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in ppdList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem style="float: right;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" @click="appearData">
                <img src="../../../assets/common/print.png" alt="add">&nbsp;下载
            </a>
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData" @on-selection-change="selectChange"></BaseTable>
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
        <!-- 详情 -->
        <component :title="modalTitle" :is='com' :id='id' @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import tubeInfo from './tubeInfo';
    import qs from 'qs';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'tubeCheck',
        data() {
            return {
                gradeList: [],
                classList: [],
                req: {
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    cate_id: '-1',
                    mqjc_id: 0,
                    kyzz_id: 0,
                    ppd_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    name: ''
                },
                columns: [
                    {
                        title: ' ',
                        width: 40,
                    },
                    {
                        title: '序号',
                        width: 70,
                        type: 'index',
                    },
                    {
                        title: '区域',
                        width: 120,
                        key: 'areaname'
                    },
                    {
                        title: '学校名称',
                        key: 'dep_str',
                        width: 120
                    },
                    {
                        title: '类别',
                        key: 'category_str'
                    },
                    {
                        title: '姓名',
                        key: 'student_name'
                    },
                    {
                        title: '密切接触者史',
                        key: 'touch'
                    },
                    {
                        title: '可疑症状者',
                        key: 'have'
                    },
                    {
                        title: 'PPD试验结果判定',
                        key: 'ppdResult',
                        width: 140
                    },
                    {
                        title: '通知状态',
                        key: 'action',
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    marginRight: 0,
                                    cursor: 'pointer'
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
                                        src: require('../../../assets/common/detail.png')
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
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                areaList1: [],
                areaList: [],
                schoolList: [],
                categeryList: [],
                selectValue: [],
                yearList: yearLists().reverse(),
                mqjcList: [
                    {id: 0, name: '全部'},
                    {id: 2, name: '是'},
                    {id: 4, name: '不是'},
                ],
                kyzzList: [
                    {id: 0, name: '全部'},
                    {id: 1, name: '是'},
                    {id: 3, name: '不是'},
                ],
                ppdList: [
                    {id: 1, name: '阴性'},
                    {id: 2, name: '一般阳性'},
                    {id: 3, name: '中度阳性'},
                    {id: 4, name: '强阳性'},
                ],

                com: null,
                id: '',
                modalTitle: '',
                is_manage: true
            };
        },
        methods: {
            // 查询条件框
            getSelectCondition() {
                // 学校
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1,
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
                // 类别
                this.$ajax({
                    url: urls.categery_list,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.categeryList = data.data;
                        } else {
                            this.categeryList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
                // 区域
                this.$ajax({
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {

                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },

            schoolChange(value) {
                // this.req.grade_no = "-1";
                // if (value === "-1") {
                //     this.gradeList = [];
                //     return false;
                // }
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
                        // year: this.req.year ? this.req.year : null,
                        // term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: value,
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
                this.req.area_id2 = '-1';
                // 区
                this.$ajax({
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "pid":value,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            // 获取结核病筛查列表
            getJieHeList() {

                const {year, dep_id, area_id1, area_id2, cate_id, mqjc_id, kyzz_id, ppd_id} = this.req;
                this.$ajax({
                    url: urls.jiehe_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year: year !== '-1' ? year : null,
                        dep_id: dep_id !== '-1' ? dep_id : null,
                        p_area: area_id1 !== '-1' ? area_id1 : null,
                        c_area: area_id2 !== '-1' ? area_id2 : null,
                        category_id: cate_id !== '-1' ? cate_id : null,
                        closeContacts: mqjc_id ? mqjc_id : 0,
                        suspiciousSymptoms: kyzz_id ? kyzz_id : 0,
                        ppd: ppd_id !== '-1' ? ppd_id : null,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                        student_name: this.req.name
                    }
                }).then(data => {
                    // console.log(data)
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });

            },
            search() {
                this.getJieHeList();
            },
            selectChange(value) {
                this.selectValue = value;
            },
            // 打印
            appearData() {
                const {year, dep_id, area_id1, area_id2, cate_id, mqjc_id, kyzz_id, ppd_id} = this.req;
                let data = {};
                if (year !== '-1') {
                    data.year = year;
                }
                if (dep_id !== '-1') {
                    data.dep_id = dep_id;
                }
                if (area_id1 !== '-1') {
                    data.p_area = area_id1;
                }
                if (area_id2 !== '-1') {
                    data.c_area = area_id2;
                }
                if (cate_id !== '-1') {
                    data.category_id = cate_id;
                }
                data.closeContacts = mqjc_id;
                data.suspiciousSymptoms = kyzz_id;

                if (ppd_id !== '-1') {
                    data.ppd = ppd_id;
                }

                window.location.href = `${urls.proofreading_upload}?${qs.stringify(data)}`
            },
            // 详情
            info(row) {
                this.com = tubeInfo;
                this.id = row;
                this.modalTitle = '详情';
            },
            // 分页搜索
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
        }
        ,
        mounted() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10201001' && code !== '10204001' && code !== '10200001') { // 管理员, 教育局
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
                this.schoolChange(this.req.dep_id)
            }
            this.getSelectCondition();
            this.getJieHeList();
            // this.search();
        }
    }
    ;
</script>
<style lang="less">
    .tubeCheck {
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

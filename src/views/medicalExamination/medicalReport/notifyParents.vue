<template>
    <div class="personSummaryReport">
        <div class="content-box">
            <h3 class="title">告家长书</h3>
            <Form class="clearfix search-form" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="req.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="req.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <i-select v-model="req.dep_id" filterable style="width:150px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="40">
                    <i-select v-model="req.grade_no" style="width:120px" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="40">
                    <i-select v-model="req.class_no" style="width:120px">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="状态" :label-width="50">
                    <i-select v-model="req.status" style="width:80px">
                        <i-option value="-1">全部</i-option>
                        <i-option :value='2'>异常</i-option>
                        <i-option :value='1'>正常</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div style="margin-top:4px">
                <div class="add" @click="prints">
                    <img alt="print" src="../../../assets/common/print.png"/>
                    打印
                </div>
            </div>
            <BaseTable border center :columns="columns" ref="reportTable" :data="tableData" :loading="loading"
                   @on-selection-change="selectionChange" class="reportList"></BaseTable>

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

        </div>
        <component :title="modalTitle" :is='com' :row="row"
                   :flag="flag" :student_id='student_id' @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import notifyParentsInfo from './notifyParentsInfo';
    import notifyParentsPrint from './notifyParentsPrint';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'notifyParents',
        data() {
            return {
                loading: true,
                req: {
                    status: '-1',
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    student_name: ''
                },
                tableData: [],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        type: 'index',
                        width: 60,
                        fixed: 'left',
                        title: '序号',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 100,
                        key: 'year',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 160,
                        key: 'area',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        minWidth: 130,
                        key: 'school_name',
                        align: 'center'
                    },
                    {
                        title: '年级-班级',
                        width: 160,
                        key: 'gc',
                        align: 'center'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        width: 60,
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '口腔科',
                        align: 'center',
                        children: [
                            {
                                title: '齿列',
                                key: 'dentition',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition == '1' ? '整齐' : '不齐');
                                }
                            },
                            {
                                title: '牙周',
                                key: 'periodontal',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    return h('span', null, params.row.periodontal == '1' ? '正常' : '异常');
                                }
                            },
                            {
                                title: '有无龋齿（无/有）',
                                key: 'decayed_tooth',
                                align: 'center',
                                width: 130,
                                render: (h, params) => {
                                    return h('span', null, params.row.decayed_tooth == '1' ? '无' : '有');
                                }
                            },
                            {
                                title: '龋患恒牙',
                                key: 'he_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋患乳牙',
                                key: 'ru_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋失恒牙',
                                key: 'he_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋失乳牙',
                                key: 'ru_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补恒牙',
                                key: 'he_repair',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补乳牙',
                                key: 'ru_repair',
                                align: 'center',
                                width: 70
                            },
                            // {
                            //     title: '其他记录 *',
                            //     key: 'remark',
                            //     align: 'center',
                            //     width: 100,
                            //     render: (h, params) => {
                            //         return h('span', null, params.row.remark ? params.row.remark : '无');
                            //     }
                            // },
                        ]
                    },
                    {
                        title: '外科',
                        align: 'center',
                        children: [
                            {
                                title: '皮肤',
                                key: 'skin_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '淋巴结',
                                key: 'lymph_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120,
                            },
                            {
                                title: '头部',
                                key: 'head_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120,
                                // render: (h, params) => {
                                //     return h('span', null, params.row.head === 1 ? '正常' : '异常');
                                // }
                            },
                            {
                                title: '颈部',
                                key: 'neck_str',
                                ellipsis: true,
                                tooltip: true,
                                width: 120,
                                align: 'center'
                            },
                            {
                                title: '胸部',
                                key: 'throax_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '其他记录 *',
                                key: 'other',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 120,
                                render: (h, params) => {
                                    return h('span', null, params.row.other ? params.row.other : '无');
                                }
                            },
                        ]
                    },
                    {
                        title: '内科',

                        align: 'center',
                        children: [
                            {
                                title: '近期不适症状',
                                key: 'recent_unwell',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120,
                                // render: (h, params) => {
                                //     return h('span', null, params.row.recent_unwell ? params.row.recent_unwell : '无');
                                // }
                            },
                            {
                                title: '其他症状 *',
                                key: 'other_unwell',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120,
                                // render: (h, params) => {
                                //     return h('span', null, params.row.other_unwell ? params.row.other_unwell : '无');
                                // }
                            },
                            {
                                title: '心',
                                key: 'heart_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 140
                            },
                            {
                                title: '肺',
                                key: 'lung_str',
                                ellipsis: true,
                                tooltip: true,
                                width: 140,
                                align: 'center'
                            },
                            {
                                title: '肝',
                                key: 'liver_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 60
                            },
                            {
                                title: '脾',
                                key: 'spleen_str',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 60
                            },
                            {
                                title: '其他记录 *',
                                key: 'other_record',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 100,
                                // render: (h, params) => {
                                //     return h('span', null, params.row.other_record ? params.row.other_record : '无');
                                // }
                            },
                        ]
                    },
                    {
                        title: '状态',
                        width: 60,
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            const state = params.row.status;
                            return h('span', {
                                style: {
                                    color: state === '异常' ? '#FF7200' : '#000'
                                }
                            }, state);
                        }
                        // render: (h, params) => {
                        //     const state = params.row.r_state;
                        //     let tmpStr = '';
                        //     if (state === 1) {
                        //         tmpStr = '正常';
                        //     } else if (state === 2) {
                        //         tmpStr = '异常';
                        //     } else {
                        //         tmpStr = '已核实';
                        //     }
                        //     return h('span', {
                        //         style: {
                        //             color: state === 2 ? '#FF7200' : '#000'
                        //         }
                        //     }, tmpStr);
                        // }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        fixed: 'right',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '0px'
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
                                            src: require('../../../assets/common/info.png')
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
                selectionValue: [],
                yearList: [],
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                modalTitle: '',
                flag: false,
                id: '',
                row: {},
                com: null,
                student_id: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                is_manage: true
            };
        },
        methods: {
            infos(row) {
                this.row = row;
                this.student_id = row.student_id;
                this.flag = true;
                this.modalTitle = '详情页';
                this.com = notifyParentsInfo;
            },
            // 获取查询下拉框
            getSelectCondition() {
                this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });

                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === 2);
                        if (!this.is_manage) {
                            this.schoolChange(this.req.dep_id);
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
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    return false;
                }
                /// =========== 所属年级
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
            // 获取区级城市
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            // 查询
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            // 列表数据
            search() {
                const {year, area_id1, area_id2, dep_id, grade_no, class_no, student_name, status} = this.req;

                const {page, size} = this.pageConfig;
                this.$ajax({
                    url: urls.parent_list,
                    data: {
                        page: page,
                        size: size,
                        year: year,
                        area_pid: area_id1 === '-1' ? null : area_id1,
                        area_id: area_id2 === '-1' ? null : area_id2,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        class_no: class_no === '-1' ? null : class_no,
                        student_name: student_name ? student_name : null,
                        status: status === '-1' ? null : status
                    }
                }).then(data => {
                    this.loading = false;
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.tableData = [];
                });
            },
            // 打印
            prints() {
                // 打印
                if (this.selectionValue.length === 0) {
                    this.$Message.error('请选择要打印的报告');
                    return;
                }
                // this.student_id = this.selectionValue;
                this.row = this.selectionValue;
                this.flag = true;
                this.modalTitle = '打印';
                this.com = notifyParentsPrint;
            },
            selectionChange(value) {
                // this.selectionValue = value.map(item =>item.id);
                this.selectionValue = value;
            },
            // 分页
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
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001' && code !== '10202001' && code !== '10204001') { // 管理员, 教育局
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .reportList {
        thead {
            .ivu-table-cell {
                font-size: 14px !important;
            }
        }
    }

    .ivu-tooltip, .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }

</style>

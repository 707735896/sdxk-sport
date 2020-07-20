<template>
    <div class="phySchedule content-box">
        <h3 class="title">监测计划规划（手动）<span class="arrow"></span><span class="sub">监测排程</span></h3>
        <Form inline>
            <FormItem label="监测年份" :label-width="80">
                <i-select style="width:140px" v-model="req.year">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</Option>
                </i-select>
                <!--<DatePicker type="year" format="yyyy" v-model="req.year" style="width: 140px"></DatePicker>-->
            </FormItem>
            <FormItem label="监测计划代号" :label-width="120">
                <i-input v-model="req.code" :maxlength="15" placeholder="关键词筛选" style="width: 300px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <!-- <div>
            <a href="javascript:void(0)" class="add" @click="plan(1)">
                新增
            </a>
        </div> -->
        <BaseTable center :disabled-hover='true' :columns="columns" :data="tableData"></BaseTable>
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

        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :info="info"
                   @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import addSchedule from './addSchedule';
    import scheduleInfo from '../monitorTestAudit/audit';
    import urls from '@/service/Urls';
    import {yearLists, todayYear} from "@/libs/dateUtils";

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    code: '',
                    year: todayYear(),
                },
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 100
                    },
                    {
                        title: '监测学年',
                        key: 'year',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`)
                        }
                    },
                    {
                        title: '监测计划代号',
                        key: 'code'
                    },
                    {
                        title: '监测计划状态',
                        key: 'state',
                        render: (h, params) => {
                            if (params.row.status === 1) {
                                return h('span', null, '未排程');
                            } else if (params.row.status === 2) {
                                return h('span', null, '计划禁用');
                            } else if (params.row.status === 3) {
                                return h('span', {style:{color:"#FF7200"}}, '排程中');
                            } else if (params.row.status === 4) {
                                return h('span', null, '已排程');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 200,
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
                                            this.infos(params.row.id, params.row.state);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
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
                                    }, '详情')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: params.row.status === 1 || params.row.status === 3 ? 'inline-block' : 'none',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.plan(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('@/assets/medicalExamination/schedule.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '排程')
                                ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                hospitalList: [],
                yearList: [],
                modalTitle: '',
                id: '',
                flag: false, // true 详情
                com: null,
                info: 1,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            // 查询
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            // 排程列表数据
            search() {
                this.$ajax({
                    url: urls.monitorPlan_list,
                    data: {
                        isSchedule:1,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        code: this.req.code ? this.req.code : null,
                        year: this.req.year === '-1' ? null : this.req.year
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                        // this.$Message.success('数据查询成功');
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                        // this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.$Message.error('数据查询失败');
                });
            },
            // 详情
            infos(id, status) {
                // console.log(status)
                if (status === 4) {
                    this.com = scheduleInfo;
                    this.modalTitle = '监测计划审核详情';
                } else {
                    this.com = addSchedule;
                    this.modalTitle = '监测计划详情';
                }

                this.info = 1;
                this.id = id;
                this.flag = true;

            },
            // 排程
            plan(id) {
                this.com = addSchedule;
                this.info = 2;
                this.id = id;
                this.flag = false;
                this.modalTitle = '监测计划排程';
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
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
        },
        created() {
            this.yearList = yearLists().reverse();

            this.search();
        }
    };
</script>

<style lang="less">
    .phySchedule {

        .arrow {
            position: relative;
            top: -3px;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 20px;
            border: 2px solid rgba(255, 123, 16, 1);
            border-left: 0;
            border-bottom: 0;
            background: transparent;
            transform: rotate(45deg);
        }

        .sub {
            font-size: 26px;
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(255, 123, 16, 1);
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .disabled span {
            color: #ccc;
        }
    }
</style>


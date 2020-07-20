<template>
    <div class="physicalTestAudit content-box">
        <h3 class="title">体测计划规划（手动）<span class="arrow"></span><span class="sub">审核</span></h3>
        <Form inline>
            <FormItem label="体测学年" :label-width="80">
                <i-select style="width:140px" v-model="req.year">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</Option>
                </i-select>
            </FormItem>
            <!--<FormItem label="体测年份" :label-width="80">-->
            <!--<DatePicker type="year" format="yyyy" v-model="req.year" style="width: 140px"></DatePicker>-->
            <!--</FormItem>-->
            <FormItem label="体测计划代号" :label-width="120">
                <i-input v-model="req.code" :maxlength="10" placeholder="关键词筛选" style="width: 300px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
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

        <component :title="modalTitle" :is='com' :id='id' :info="info" :flag="flag"
                   @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import AddSection from './addAudit';
    import urls from '@/service/Urls';
    import {yearLists} from "@/libs/dateUtils";

    export default {
        name: 'physicalTestAudit',
        data() {
            return {
                req: {
                    code: '',
                    year: '-1'
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
                        title: '体测年份',
                        key: 'year'
                    },
                    {
                        title: '体测计划代号',
                        key: 'code'
                    },
                    {
                        title: '学校',
                        key: 'school'
                    },
                    {
                        title: '体检计划状态',
                        key: 'state',
                        render: (h, params) => {
                            if (params.row.state === 1) {
                                return h('span', null, '新建');
                            } else if (params.row.state === 2) {
                                return h('span', null, '已排程');
                            } else if (params.row.state === 3) {
                                return h('span', null, '已通过');
                            } else if (params.row.state === 4) {
                                return h('span', null, '已驳回');
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
                                        display: params.row.state === 2 ? 'inline-block' : 'none',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.audit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/review.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '审核')
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
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.app_physical_list,
                    data: {
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
            infos(id, state) {
                this.com = AddSection;
                this.id = id;
                this.flag = true;
                if (state === 4 || state === 3) {
                    this.info = 1;
                } else {
                    this.info = 2;
                }
                this.modalTitle = '体测计划详情';
            },
            audit(id) {
                this.com = AddSection;
                this.id = id;
                this.info = 1;
                this.flag = false;
                this.modalTitle = '体测计划审核';
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
            this.yearList = yearLists().reverse();
            this.search();
        }
    };
</script>

<style lang="less">
    .physicalTestAudit {
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
            font-size: 20px;
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



<template>
    <div class="phyPlan content-box">
        <h3 class="title">监测计划规划（手动）<span class="arrow"></span><span class="sub">设定监测计划</span></h3>
        <Form inline>
            <FormItem label="监测学年" :label-width="80">
                <i-select style="width:140px" v-model="req.year">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="监测计划代号" :label-width="120">
                <i-input v-model="req.code" :maxlength="15" placeholder="关键词筛选" style="width: 300px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add">
                <img src="../../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
        </div>
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

        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :isEdit="isEdit" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import AddSection from './addTestPlan';
    import urls from '@/service/Urls';
    import {yearLists,todayYear} from "@/libs/dateUtils";

    export default {
        name: 'monitorTestPlan',
        data() {
            return {
                req: {
                    code: '',
                    year: todayYear()
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
                            return h('span', null, `${params.row.year}-${Number(params.row.year)+1}`)
                        }
                    },
                    {
                        title: '监测计划代号',
                        key: 'code'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let tmpStr = "";
                            if(params.row.status === 1 || params.row.status === 2){
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
                                                this.switch(params.row.id, params.row.status, params.row.code);
                                            }
                                        }
                                    }),
                                    h('span', params.row.status === 1 ? '启用' : '禁用')
                                ]);
                            }else {
                                if(params.row.status  === 3){
                                    tmpStr="排程中";
                                }else
                                    tmpStr="已排程";
                                }
                                return h('span',{
                                    style:{
                                        color: params.row.status === 3 ? "#FF7200":"#515a6e"
                                    }
                                },tmpStr)
                        }


                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 200,
                        render: (h, params) => {
                            if(params.row.status === 1 || params.row.status === 2  ) {
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
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/detail.png')
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
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/edit.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '编辑')
                                ]),
                            ]);
                            }else {
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
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/detail.png')
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
                    }
                ],
                tableData: [],
                hospitalList: [],
                yearList:[],
                modalTitle: '',
                flag: false, // true详情
                id: '',
                com: null,
                isEdit: false,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            // 新增
            add() {
                this.com = AddSection;
                this.id = '';
                this.flag = false;
                this.isEdit = false
                this.modalTitle = '监测计划新增';
            },
            // 详情
            infos(id) {
                this.com = AddSection;
                this.id = id;
                this.flag = true;
                this.isEdit = false;

                this.modalTitle = '监测计划规划详情';
            },
            // 编辑
            edit(id) {
                this.com = AddSection;
                this.id = id;
                this.isEdit = true
                this.flag = false;
                this.modalTitle = '监测计划编辑';
            },
            // 启用/禁用
            switch(id, status, code) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该监测计划？';
                    msg1 = '禁用' + code + '监测计划成功';
                    msg2 = '禁用' + code + '监测计划失败';
                } else {
                    data.status = 1;
                    text = '确定启用该监测计划？';
                    msg1 = '启用' + code + '监测计划成功';
                    msg2 = '启用' + code + '监测计划失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.monitorPlan_state,
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
                            }
                        }).catch(() => {

                            self.$Message.error(msg2);
                        });
                    },
                    cancel: function () {
                        self.tableData = [];
                        self.search();
                    }
                });
            },
            // 查询
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            // 列表数据
            search() {
                this.$ajax({
                    url: urls.monitorPlan_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        code: this.req.code ? this.req.code : null,
                        year: this.req.year === '-1' ? null: this.req.year
                    }
                }).then(data => {
                    if (data.code === 200) {
                        // console.log(data)
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
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            },
            getSelectCondition() {
                // let start = 2018;
                // let today = new Date().getFullYear();
                // let m = today - start;
                // let temp = [];
                // for (let i = 0; i <= m; i++) {
                //     temp.push({
                //         value: start + i,
                //         name: `${start + i}-${start + i + 1}`
                //     });
                // }
                // this.yearList = temp.reverse();
                // this.req.year = this.yearList[0].value
                // console.log(this.yearList)
            }
        },
        created() {
            this.yearList = yearLists().reverse();
            this.search();
        }
    };
</script>

<style lang="less">
    .phyPlan {
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


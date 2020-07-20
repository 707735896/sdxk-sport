<template>
    <div class="user">
        <div class="content-box">
            <div class="title">监测队伍配置</div>
            <Form ref="formInline" :model="searchList" inline>
                <FormItem label="监测学年" :label-width="80">
                     <i-select style="width:180px" v-model="searchList.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                    <!-- <DatePicker type="year" style="width: 180px" placeholder="请选择日期"
                                v-model="searchList.year"></DatePicker> -->
                </FormItem>
                <FormItem label="检测队伍名称" :label-width="120">
                    <i-input v-model.trim="searchList.team_name" style="width: 200px"/>
                </FormItem>

                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <div class="add" @click="add">
                    <img style="margin: 0 6px;" src="../../../assets/system/role/add.png" alt="新增"/>
                    新增
                </div>
            </div>
            <BaseTable ref="selection" :columns="columns" :data="data"></BaseTable>
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
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :isEdit="isEdit" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import AddTeam from './addMonitorTeam';
    import {yearLists,todayYear} from "@/libs/dateUtils";

    export default {
        data() {
            return {
                modalTitle: '',
                flag: false, // true详情
                id: '',
                com: null,
                isEdit: false,
                searchList: {
                    team_name: null,
                    status: '-1',
                    year:todayYear()
                },
                totalRecords: 0,
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        align:'center',
                        type: 'index'
                    },
                    {
                        title: '监测学年',
                        key: 'year',
                        render:(h,params) => {
                            return  h('span', null, `${params.row.year}-${Number(params.row.year)+1}`)
                        }

                    },
                    {
                        title: '监测队伍名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
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
                        key: 'operation',
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
                                            this.infos(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/system/role/info.png')
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
                                            src: require('../../../assets/system/role/edit.png')
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
                data: [],
                yearList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            pageChange(page) {
                this.pageConfig.page = page;
                this.getUserList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            add() {
                this.com = AddTeam;
                this.id = '';
                this.flag = false;
                this.modalTitle = '监测队伍新增';
            },
            infos(id) {
                this.com = AddTeam;
                this.id = id;
                this.flag = true;
                this.isEdit = false;
                this.modalTitle = '监测队伍详情';
            },
            edit(id) {
                this.com = AddTeam;
                this.id = id;
                this.isEdit = true;
                this.flag = false;
                this.modalTitle = '监测队伍编辑';
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.getUserList();
                }
            },
            // 启用禁用
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该队伍？';
                    msg1 = '禁用' + name + '队伍成功';
                    msg2 = '禁用' + name + '队伍失败';
                } else {
                    data.status = 1;
                    text = '确定启用该队伍？';
                    msg1 = '启用' + name + '队伍成功';
                    msg2 = '启用' + name + '队伍失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.monitorTeam_state,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.getUserList();
                            } else {
                                self.$Message.error(msg2);
                            }
                        });
                    },
                    cancel: () => {
                        self.data = [];
                        self.getUserList();
                    }
                });
            },
            Search() {
                this.pageConfig.page = 1;
                this.getUserList();
            },
            // 获取列表
            getUserList() {
                this.$ajax({
                    url: urls.monitorTeam_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        name: this.searchList.team_name?this.searchList.team_name:'',
                        year: this.searchList.year?this.searchList.year+'' : null
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
        },
        mounted() {
            this.yearList = yearLists().reverse();
            this.getUserList();
        },
    };
</script>

<style lang="scss">
    .ivu-btn {
        padding: 0;
    }

    .active {
        display: none;
    }

    .userAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            // padding-top: 57px !important;
            .leftFormItem {
                padding-left: 62px;
                width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                padding-left: 66px;
                width: 266px;
            }
            .ivu-row {
                margin-bottom: 43px;
            }

            .checkAreaGroup {
                margin-left: 62px;
                width: 526px;
                .checkArea {
                    .check-box {
                        margin: 10px 20px 0;
                        padding: 0;
                        width: 18px;
                        /*height: 18px;*/
                        /*background-color: white;*/
                        cursor: pointer;
                    }
                    img {
                        position: absolute;
                        top: 15px;
                        left: 34px;
                        pointer-events: none;
                    }
                    .ivu-checkbox-inner {
                        display: none;
                    }
                    width: 526px;
                    height: 256px;
                    overflow-y: auto;
                    .per-item {
                        position: relative;
                        width: 80px;
                        height: 73px;
                        margin-right: 9px;
                        text-align: center;
                        color: #021D21;
                        font-size: 14px;
                        margin-top: 8px;
                        display: inline-block;
                    }
                    .per-item-odd {
                        @extend .per-item;
                        background-color: #F0EFDF;
                    }
                    .per-item-even {
                        @extend .per-item;
                        background-color: #BBDFDF;
                    }
                }
            }
        }
        .footer {
            margin: 139px 38px 22px 0;
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

</style>

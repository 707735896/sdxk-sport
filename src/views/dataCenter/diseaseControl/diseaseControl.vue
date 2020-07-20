<template>
    <div class="diseaseControl content-box">
        <h3 class="title">疾控中心信息管理</h3>
        <Form inline label-position="left" class="search-form">
            <FormItem label="所属区域" prop="area_id1" :label-width="80" style="margin-right: 0!important;">
                <i-select v-model="req.area_id1" style="width:120px;" @on-change="areaChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="" prop="area_id1">
                <i-select v-model="req.area_id2" style="width:140px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="疾控中心" :label-width="70">
                <i-input v-model.trim="req.name" :maxlength="20" style="width: 200px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add" style="margin-right: 45px;">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
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
    import urls from '@/service/Urls';
    import Add from './Add';

    export default {
        name: 'DiseaseControl',
        data() {
            return {
                req: {
                    area_id1: '-1',
                    area_id2: '-1',
                    name: ''
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
                        title: '疾控中心',
                        key: 'name'
                    },
                    {
                        title: '所属区域',
                        key: 'area_id'
                    },
                    {
                        title: '详细地址',
                        key: 'location'
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
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(
                                                params.row.id,
                                                params.row.name,
                                                params.row.status
                                            );
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
                                        marginRight: '0',
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
                                    }, '编辑')]
                            );
                        }
                    }
                ],
                tableData: [],
                areaList1: [],
                areaList: [],
                // is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                // is_school_manage: false,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                }
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter((item) => item.type === 2);
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                const {page, size} = this.pageConfig;
                const {name, area_id1, area_id2} = this.req;

                this.$ajax({
                    url: urls.dept_list,
                    data: {
                        page: page,
                        size: size,
                        type: 4,
                        name: name ? name : null,
                        parea: area_id1 === '-1' ? null : area_id1,
                        carea: area_id2 === '-1' ? null : area_id2
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.tableData = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.tableData = [];
                            this.pageConfig.total = 0;
                        }
                    })
                    .catch(() => {
                        this.tableData = [];
                        this.$Message.error('数据查询失败');
                    });
            },
            add() {
                this.com = Add;
                this.id = '';
                this.flag = false;
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = Add;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            areaChange(value) {
                this.req.area_id2 = '-1';
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
            switch(id, name, status) {
                let data = {};
                let text = '';
                let msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该疾控中心？';
                    msg1 = '禁用' + name + '成功';
                    msg2 = '禁用' + name + '失败';
                } else {
                    data.status = 1;
                    text = '确定启用该疾控中心？';
                    msg1 = '启用' + name + '成功';
                    msg2 = '启用' + name + '失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.dept_status,
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
                    cancel: function () {
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
            this.getSelectCondition(2);
            this.search();
        }
    };
</script>

<style lang="less">
    .diseaseControl {
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

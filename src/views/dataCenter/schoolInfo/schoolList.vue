<template>
    <div class="school content-box">
        <h3 class="title">学校信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="学校代号" :label-width="70">
                <i-input v-model.trim="req.code2" :maxlength="20" style="width: 200px"></i-input>
            </FormItem>
            <FormItem label="学校名称" :label-width="70">
                <i-input v-model.trim="req.name" :maxlength="20" style="width: 200px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add">
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

        <component :title="modalTitle" :is='com' :id='id' @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import addSchool from './addSchool';
    import urls from '@/service/Urls';

    export default {
        name: 'SchoolList',
        data() {
            return {
                req: {
                    name: '',
                    code2: ''
                },
                columns: [
                    {
                        title: ' ',
                        width: 40,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '学校代号',
                        key: 'code2'
                    },
                    {
                        title: '学校名称',
                        key: 'name'
                    },
                    {
                        title: '学校性质',
                        key: 'nature'
                    },
                    {
                        title: '所在区域',
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
                        key: 'operator',
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
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
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                tableData: [],
                modalTitle: '',
                id: '',
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                }
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
                    url: urls.dept_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        type: 2,
                        name: this.req.name ? this.req.name : null,
                        code2: this.req.code2 ? this.req.code2 : null,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.$Message.error('数据查询失败');
                });
            },
            add() {
                this.com = addSchool;
                this.id = '';
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = addSchool;
                this.id = id;
                this.modalTitle = '编辑';
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该学校？';
                    msg1 = '禁用' + name + '学校成功';
                    msg2 = '禁用' + name + '学校失败';
                } else {
                    data.status = 1;
                    text = '确定启用该学校？';
                    msg1 = '启用' + name + '学校成功';
                    msg2 = '启用' + name + '学校失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.dept_status,
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
                    cancel: () => {
                        self.tableData = [];
                        self.search();
                    }
                });
            },
            selectChange(selection) {
                console.log(selection);
            },
            rowClass(row) {
                return row.status === 0 ? 'disabled' : '';
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
            this.search();
        }
    };
</script>

<style lang="less">
    .school {
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

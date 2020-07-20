<template>
    <div class="fitMonitor content-box">
        <h3 class="title">监测人员信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="单位名称" :label-width="70">
                <i-input v-model.trim="req.dep_name" :maxlength="30" style="width:200px"></i-input>
            </FormItem>
            <FormItem label="姓名" :label-width="40">
                <i-input v-model.trim="req.name" :maxlength="20" style="width:120px"></i-input>
            </FormItem>
            <FormItem label="性别" :label-width="40">
                <i-select v-model="req.gender" style="width:100px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option :value='1'>男</i-option>
                    <i-option :value='2'>女</i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否在职" :label-width="70">
                <i-select v-model="req.in_queue" style="width:100px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option :value='1'>是</i-option>
                    <i-option :value='2'>否</i-option>
                </i-select>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add" style="margin-right: 45px;">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
            <a href="javascript:void(0)" class="add" @click="trash" style="margin-right: 45px;">
                <img src="../../../assets/unit/delet.png" alt="add">&nbsp;删除
            </a>
        </div>
        <BaseTable center :disabled-hover='true' :columns="columns" :data="tableData"
               @on-selection-change="selectChange"
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

        <component :title="modalTitle" :is='com' :info='info' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import urls from '@/service/Urls';
    import AddFit from './AddFit'

    export default {
        name: 'fitMonitor',
        data() {
            return {
                req: {
                    dep_name: '',
                    name: '',
                    gender: '-1',
                    in_queue: '-1'
                },
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        title: ' ',
                        type: 'selection',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 100
                    },
                    {
                        title: '单位名称',
                        key: 'dep_name'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '用户名',
                        key: 'user_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            if(params.row.gender === 1){
                                return h('span', null, '男')
                            }else if(params.row.gender === 2){
                                return h('span', null, '女')
                            }else {
                                return h('span', null, '')
                            }
                        }
                    },
                    {
                        title: '是否在职',
                        key: 'in_queue',
                        render: (h, params) => {
                            if(params.row.in_queue === 1){
                                return h('span', null, '是')
                            }else if(params.row.in_queue === 2){
                                return h('span', null, '否')
                            }else {
                                return h('span', null, '')
                            }
                        }
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
                                        marginRight: '8px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.name, params.row.status);
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
                                        this.edit(params.row);
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
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                tableData: [],
                is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                info: '',
                flag: false, // 详情时标志
                com: null,
                is_school_manage: false,
                selectionValue: [],
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
                this.selectionValue = [];
                this.$ajax({
                    url: urls.MonStaff_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        dep_name: this.req.dep_name ? this.req.dep_name : null,
                        name: this.req.name ? this.req.name : null,
                        gender: this.req.gender === '-1' ? null : this.req.gender,
                        in_queue: this.req.in_queue === '-1' ? null : this.req.in_queue
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
                });
            },
            add() {
                this.com = AddFit;
                this.info = '';
                this.flag = false;
                this.modalTitle = '新增';
            },
            edit(row) {
                this.com = AddFit;
                this.info = row;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            trash(){
                if(!this.selectionValue.length){
                    this.$Message.error('请选择要删除的数据')
                    return false
                }
                let ids = this.selectionValue.map(item => item.id);
                let self = this;
                this.$confirm({
                    text: '确定删除？',
                    onOk: function () {
                        self.$ajax({
                            url: urls.MonStaff_status,
                            data: {
                                'ids': ids,
                                'status': 0
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success('删除成功');
                                self.search();
                            } else {
                                self.$Message.error('删除失败');
                            }
                        })
                    }
                });
            },
            selectChange(value){
                this.selectionValue = value
            },
            switch(id, name, status) {
                let data = {};
                let text = '';
                let msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该人员？';
                    msg1 = '禁用' + name + '成功';
                    msg2 = '禁用' + name + '失败';
                } else {
                    data.status = 1;
                    text = '确定启用该人员？';
                    msg1 = '启用' + name + '成功';
                    msg2 = '启用' + name + '失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.MonStaff_status,
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
                    cancel: () => {
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
            if (sessionStorage.getItem('roleCode') !== '999') { // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            } else if (sessionStorage.getItem('roleCode') !== '10201001') { // 学校管理员
                this.is_school_manage = true;
            }
            this.search();
        }
    };
</script>

<style lang="less">
    .fitMonitor {
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

<template>
    <div class="scldoc content-box">
        <h3 class="title">校医信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="所属学校" :label-width="70">
                <i-select v-model="req.dep_id" filterable style="width:150px" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="校医姓名" :label-width="70">
                <i-input v-model.trim="req.name" :maxlength="20" style="width: 140px" placeholder="请输入"></i-input>
            </FormItem>
            <FormItem label="职称" :label-width="40">
                <i-select v-model="req.title" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option value="1F2AFE0FCBD1444A947C992113F4DD6C">初级</i-option>
                    <i-option value="DE3F6B45104B428DADD021FC83A543F6">中级</i-option>
                    <i-option value="01D003CC0B35401B8189D1831A566CFB">高级</i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否在编" :label-width="70">
                <i-select v-model="req.in_queue" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">是</i-option>
                    <i-option :value="2">否</i-option>
                </i-select>
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
            <a class="add" style="margin-right: 45px;" @click="trash">
                <img src="../../../assets/system/role/delete.png" alt="trash">
                删除
            </a>
        </div>
        <BaseTable center :disabled-hover="true" :columns="columns" :data="tableData" @on-selection-change="selectionChange"
               :row-class-name="rowClass"></BaseTable>
        <div class="page">
            <Page :total="pageConfig.total"
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

        <component :title="modalTitle" :is="com" :id="id" :flag="flag" @modal-close="ModalClose"></component>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import addSchDoc from './addSchDoc';
    import urls from '@/service/Urls';
    import {getAllDep} from '@/api/basicData';

    export default {
        name: 'ClassList',
        data() {
            return {
                req: {
                    dep_id: '-1',
                    name: '',
                    title: '-1',
                    in_queue: '-1'
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 70
                    },
                    {
                        title: '校医姓名',
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
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '出生年月',
                        key: 'birthday'
                    },
                    {
                        title: '学历',
                        key: 'education'
                    },
                    {
                        title: '专业',
                        key: 'major'
                    },
                    {
                        title: '职称',
                        key: 'title'
                    },
                    {
                        title: '是否在编',
                        key: 'in_queue',
                        render: (h, params) => {
                            return h('span', null, params.row.in_queue === 1 ? '是' : '否');
                        }
                    },
                    {
                        title: '所属学校',
                        key: 'dep_id'
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
                            return h(
                                'span',
                                {
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
                                },
                                [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('@/assets/unit/edit_cover.png')
                                        }
                                    }),
                                    h(
                                        'span',
                                        {
                                            style: {
                                                position: 'relative',
                                                top: '-4px'
                                            }
                                        },
                                        '编辑'
                                    )
                                ]
                            );
                        }
                    }
                ],
                tableData: [],
                schoolList: [],
                is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                selectionValue: [],
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                // 学校
                getAllDep().then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === type);
                    } else {
                        this.schoolList = [];
                    }
                })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.selectionValue = [];
                this.$ajax({
                    url: urls.teacher_lists,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        type: 3,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        name: this.req.name,
                        title: this.req.title === '-1' ? null : this.req.title,
                        in_queue: this.req.in_queue === '-1' ? null : this.req.in_queue,
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
                    });
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.forEach(item => {
                    this.selectionValue.push(item.id);
                });
            },
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的医生');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除校医？',
                    onOk: () => {
                        self
                            .$ajax({
                                url: urls.teacher_status,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除校医成功');
                                    self.search();
                                } else {
                                    self.$Message.error('删除校医失败');
                                }
                            })
                            .catch(() => {
                                self.$Message.error('删除校医失败');
                            });
                    },
                    cancel: () => {
                        self.search();
                    }
                });
            },
            add() {
                this.com = addSchDoc;
                this.id = '';
                this.flag = false;
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = addSchDoc;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            infos(id) {
                this.com = addSchDoc;
                this.id = id;
                this.flag = true;
                this.modalTitle = '详情页面';
            },
            switch(id, name, status) {
                let data = {};
                let text = '';
                let msg1 = '',
                    msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该校医？';
                    msg1 = '禁用' + name + '校医成功';
                    msg2 = '禁用' + name + '校医失败';
                } else {
                    data.status = 1;
                    text = '确定启用该校医？';
                    msg1 = '启用' + name + '校医成功';
                    msg2 = '启用' + name + '校医失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self
                            .$ajax({
                                url: urls.teacher_status,
                                data: {
                                    ids: [id],
                                    status: data.status
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success(msg1);
                                    self.search();
                                } else {
                                    self.search();
                                    self.$Message.error(msg2);
                                }
                            })
                            .catch(() => {
                                self.search();
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
            if (sessionStorage.getItem('roleCode') !== '999') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition(2);
            this.search();
        }
    };
</script>

<style lang="less">
    .scldoc {
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

<template>
    <div class="section content-box">
        <h3 class="title">科室信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="所属医疗机构" :label-width="100">
                <i-select v-model="req.dep_id" filterable style="width:220px" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="科室名称" :label-width="70">
                <i-input v-model.trim="req.name" :maxlength="15" style="width: 160px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed />
        <div>
            <a href="javascript:void(0)" class="add" @click="add">
                <img src="../../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
        </div>
        <Table center :disabled-hover='true' :columns="columns" :data="tableData"
               :row-class-name='rowClass'></Table>
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

    import AddSection from './addSection';
    import urls from 'src/service/Urls';

    export default {
        name: 'SectionList',
        data() {
            return {
                req: {
                    name: '',
                    dep_id: '-1'
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
                        width: 60
                    },
                    {
                        title: '科室名称',
                        key: 'name'
                    },
                    {
                        title: '所属医疗机构',
                        key: 'dep_id',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
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
                                        src: require('src/assets/unit/edit_cover.png')
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
                hospitalList: [],
                modalTitle: '',
                id: '',
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                is_manage:true
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        type: 3,
                        status: 1,
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalList = data.data.filter((item)=>item.type ===3);
                    } else {
                        this.hospitalList = [];
                    }
                }).catch(err => {
                    this.hospitalList = [];
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.section_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        name: this.req.name ? this.req.name : null,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
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
                this.com = AddSection;
                this.id = '';
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = AddSection;
                this.id = id;
                this.modalTitle = '编辑';
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该科室？';
                    msg1 = '禁用' + name + '科室成功';
                    msg2 = '禁用' + name + '科室失败';
                } else {
                    data.status = 1;
                    text = '确定启用该科室？';
                    msg1 = '启用' + name + '科室成功';
                    msg2 = '启用' + name + '科室失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.section_status,
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
                    cancel:function () {
                        self.search();
                    }
                });
            },
            selectChange(selection){
                console.log(selection)
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
            if(sessionStorage.getItem('roleCode') !== '999'){
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>

<style lang="less">
    .section {

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

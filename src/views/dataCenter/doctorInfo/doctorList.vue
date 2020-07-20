<template>
    <div class="doctor content-box">
        <h3 class="title">医生信息管理</h3>
        <Form class="search-form" inline label-position="left">
            <FormItem label="所属医疗机构" :label-width="100">
                <i-select v-model="req.dep_id" filterable style="width:180px" @on-change="hospitalChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <!--<FormItem label="所属科室" :label-width="70">-->
                <!--<i-select v-model="req.hospital_dep_id" style="width:170px">-->
                    <!--<i-option value="-1">全部</i-option>-->
                    <!--<i-option v-for="item of sectionList" :key="item.id" :value='item.id'>{{item.name}}</i-option>-->
                <!--</i-select>-->
            <!--</FormItem>-->
            <FormItem label="体检项" :label-width="70">
                <i-select v-model="req.set_id" style="width:180px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of itemList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="医生姓名" :label-width="70">
                <i-input v-model.trim="req.name" :maxlength="15" style="width: 120px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
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

    import addDoctor from './addDoctor';
    import urls from '@/service/Urls';

    export default {
        name: 'DoctorList',
        data() {
            return {
                req: {
                    name: '',
                    dep_id: '-1',
                    hospital_dep_id: '-1',
                    set_id: '-1'
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
                        title: '医生姓名',
                        key: 'name'
                    },
                    {
                        title: '用户名',
                        key: 'user_name'
                    },
                    // {
                    //     title: '所属科室',
                    //     key: 'hospital_dep_id'
                    // },
                    {
                        title: '体检项',
                        key: 'set_id'
                    },
                    {
                        title: '所属医疗机构',
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
                hospitalList: [],
                sectionList: [],
                itemList: [],
                modalTitle: '',
                id: '',
                com: null,
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
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        type: 3,
                        status: 1,
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalList = data.data.filter((item)=>item.type === 3);
                    } else {
                        this.hospitalList = [];
                    }
                }).catch(err => {
                    this.hospitalList = [];
                });
                this.$ajax({
                    url: urls.medicaltype_tree,
                    data: {
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.itemList = data.data.map((item)=>{
                            return {
                                id: item.id,
                                name:  item.name,
                            }
                        });
                    } else {
                        this.itemList = [];
                    }
                }).catch(err => {
                    this.itemList = [];
                });
            },
            hospitalChange(id){
                // if(id === '-1'){
                //     this.req.hospital_dep_id = '-1';
                //     this.sectionList = [];
                //     return;
                // }
                //
                // this.$ajax({
                //     url: urls.section_all_lists,
                //     data: {
                //         dep_id: id
                //     }
                // }).then(data => {
                //     if (data.code === 200) {
                //         this.sectionList = data.data;
                //     } else {
                //         this.sectionList = [];
                //     }
                // }).catch(err => {
                //     this.sectionList = [];
                // });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                const {page, size} = this.pageConfig;
                const {name, dep_id, set_id} = this.req;
                this.$ajax({
                    url: urls.doctor_list,
                    data: {
                        page: page,
                        size: size,
                        name: name ? name : null,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        // hospital_dep_id: this.req.hospital_dep_id === '-1' ? null : this.req.hospital_dep_id,
                        set_id: set_id === '-1' ? null : set_id
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
                this.com = addDoctor;
                this.id = '';
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = addDoctor;
                this.id = id;
                this.modalTitle = '编辑';
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该医生？';
                    msg1 = '禁用' + name + '医生成功';
                    msg2 = '禁用' + name + '医生失败';
                } else {
                    data.status = 1;
                    text = '确定启用该医生？';
                    msg1 = '启用' + name + '医生成功';
                    msg2 = '启用' + name + '医生失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: () => {
                        self.$ajax({
                            url: urls.doctor_status,
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
                    cancel:  () => {
                        self.tableData = [];
                        self.search();
                    }
                });
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
    .doctor {
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

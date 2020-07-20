<template>
    <div>
        <div class="content-box resultss">
            <div class="title">体检结果通知</div>
            <Form class="search-form" inline :label-width="72">
                <FormItem label="所属区域">
                    <i-select v-model="req.area_id1" style="width:150px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:150px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>

                <FormItem label="学校名称">
                    <i-select style="width:200px" filterable v-model="req.dep_id" :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="通知状态">
                    <i-select style="width:100px" v-model="req.type">
                        <i-option value="-1">全部</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;" :label-width="0">
                    <Button type="primary" class="search-btn" @click="search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <a href="javascript:void(0)" class="add" @click="doReview">
                    <img src="../../../assets/unit/phone.png" alt="add">&nbsp;应用
                </a>
            </div>
            <BaseTable ref="selection" :columns="columns" :data="tableData" @on-selection-change="selectChange"></BaseTable>
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
        </div>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'examResult',
        data() {
            return {
                req: {
                    area_id1: '-1',
                    area_id2: '-1',
                    type: '-1',
                    dep_id: '-1'
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '学校名称',
                        key: 'school_no'
                    },
                    {
                        title: '年级',
                        key: 'term',
                        render: (h,params) =>{
                            return params.row.term === 1?'第一学期': '第二学期'
                        }
                    },
                    {
                        title: '班级',
                        key: 'class_no'
                    },
                    {
                        title: '人数',
                        key: 'count'
                    },
                    {
                        title: '体检日期',
                        key: 'time'
                    },
                    {
                        title: '通知状态',
                        key: 'status',
                        render: (h,params) =>{
                            return params.row.status === 1?'第一学期': '第二学期'
                        }
                    }
                ],
                tableData: [],
                schoolList: [],
                areaList: [],
                areaList1: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                modal: false,
                is_manage: true
            };
        },
        methods: {
            getSelectCondition(type) {
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1,
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => {
                                return item.type === 2;
                            });
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            search() {
                // this.$ajax({
                //     url: urls.set_objects_list,
                //     data: filterInfo
                // }).then((res) => {
                //     if (res && res.data) {
                //         this.tableData = res.data;
                //     }
                // });
            },
            selectChange(value){

            },
            doReview() {

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
    .resultss {
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

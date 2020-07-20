<template>
    <div class="resultInform">
        <div class="content-box">
            <div class="title">小程序结果通知</div>
            <Form v-model="req" inline :label-width="72">
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
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="btn-box">
                <div class="action-btn" @click="open_inform">
                    <img style="margin: 9px 6px;" src="../../../assets/unit/open.png"/>
                    <span style="position: relative;top: 0px">&nbsp;开启</span>
                </div>

            </div>
            <BaseTable ref="selection" :columns="columns" :data="data"></BaseTable>
            <!-- 分页 -->
            <Page style="text-align: center;margin-top: 20px;"
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
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        data() {
            return {
                req: {
                    dep_id: '-1',
                    status: 0,
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index'
                    },
                    {
                        title: '学校名称',
                        key: 'schoolName'
                    },
                    {
                        title: '年级',
                        key: 'grade'
                    },
                    {
                        title: '班级',
                        key: 'class'
                    },
                    {
                        title: '人数',
                        key: 'number'
                    },
                    {
                        title: '体测时间',
                        key: 'time'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('span', null, params.row.status === 0 ? '未通知' : '已通知');
                        }
                    }
                ],
                data: [
                    {
                        schoolName: '苏州中学',
                        grade: '全部',
                        class: '全部',
                        number: '1254',
                        time: '2018-10-10',
                        status: 0
                    }
                ],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                schoolList: [],
                areaList: [],
                areaList1: [],
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
                        dep_id: sessionStorage.getItem('dep_id')
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
            initSearch() {
                this.filterForm.page = 1;
            },
            search() {

            },
            pageChange(page) {
                this.pageConfig.page = page;
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            open_inform() {
                this.$Message.success('已发送');
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
        },
    };
</script>

<style lang="scss">

</style>

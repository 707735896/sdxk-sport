<template>
    <div class="areasummaryreport content-box">
        <h3 class="title">区域学校汇总报告单</h3>
        <Form class="clearfix" inline label-position="left">
            <FormItem label="区域" :label-width="44">
                <i-select v-model="req.area_id" style="width:160px">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>

            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <Table center :disabled-hover='true' border :columns="columns" :data="tableData"></Table>
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
</template>

<script>
    import urls from '../../../../service/Urls';

    export default {
        name: 'areaSummaryReport',
        data() {
            return {
                req: {
                    area_id: -1,
                },
                columns: [
                    {
                        width: 100,
                        fixed: 'left',
                        title: '学校',
                        align:'center',
                        key: 'school_name',
                        // align: 'center'
                    },
                    {
                        title: '性别',
                        width: 70,
                        fixed: 'left',
                        align:'center',
                        key: 'gender',
                        // align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '学生人数',
                        key: 'allcount',
                        width: 80,
                        align:'center',
                        fixed: 'left',
                        // align: 'center'
                    },
                    {
                        title: '实检人数',
                        width: 90,
                        align:'center',
                        key: 'real_numme',
                        fixed: 'left',
                        // align: 'center'
                    },
                    {
                        title: '视力低下',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'eye_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'eye_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '沙眼',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'trachoma_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'trachoma_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '乳牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'deciduous_num',
                            // align: 'center'
                        }, {
                            title: '乳牙龋患率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per1',
                            // align: 'center'
                        }, {
                            title: '乳牙龋率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per2',
                            // align: 'center'
                        }, {
                            title: '乳牙龋失率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per3',
                            // align: 'center'
                        }, {
                            title: '乳牙龋补率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per4',
                            // align: 'center'
                        }, {
                            title: '乳牙龋均',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per5',
                            // align: 'center'
                        }, {
                            title: '乳牙龋齿充填率％',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per6',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '恒牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'permanent_num',
                            // align: 'center'
                        }, {
                            title: '恒牙龋患率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per1',
                            // align: 'center'
                        }, {
                            title: '恒牙龋率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per2',
                            // align: 'center'
                        }, {
                            title: '恒牙龋失率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per3',
                            // align: 'center'
                        }, {
                            title: '恒牙龋补率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per4',
                            // align: 'center'
                        }, {
                            title: '恒牙龋均',
                            width: 90,
                            align:'center',
                            key: 'permanent_per5',
                            // align: 'center'
                        }, {
                            title: '恒牙龋齿充填率％',
                            width: 90,
                            align:'center',
                            key: 'permanent_per6',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '营养不良',
                        align: 'center',
                        children: [{
                            title: '人数',
                            align:'center',
                            width: 90,
                            key: 'malnutrition_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'malnutrition_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '超重',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'overweight_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'overweight_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '肥胖',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'fat_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'fat_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '血压偏高',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'High_blood_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'High_blood_per',
                            // align: 'center'
                        }]
                    }
                ],
                tableData: [
                    {
                        school_name: '苏州工业园区金鸡湖学校',
                        id: "1",
                        gender: 1,
                        allcount: 1,
                        real_numme: 1,
                        eye_num: 1,
                        eye_per: '100%',
                        trachoma_num: 0,
                        trachoma_per: '0%',
                        deciduous_num: '0',
                        deciduous_per1: '0%',
                        deciduous_per2: '0%',
                        deciduous_per3: '0%',
                        deciduous_per4: '0%',
                        deciduous_per5: '0%',
                        deciduous_per6: '0%',
                        permanent_num: '0',
                        permanent_per1: '0%',
                        permanent_per2: '0%',
                        permanent_per3: '0%',
                        permanent_per4: '0%',
                        permanent_per5: '0%',
                        permanent_per6: '0%',
                        malnutrition_num: '0',
                        malnutrition_per: '0%',
                        overweight_num:'1',
                        overweight_per: '0%',
                        fat_num: '0',
                        fat_per: '0%',
                        High_blood_num: '0',
                        High_blood_per: '0%'

                    }
                ],
                areaList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                // this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    area_id: this.req.area_id === -1 ? null : this.req.area_id
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
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
                    this.pageConfig.total = 0;
                    // this.$Message.error('数据查询失败');
                });
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
        },
        created() {
            this.getSelectCondition();
            // this.search();
        }
    };
</script>

<style lang="less">
    .areasummaryreport {
        .disabled span {
            color: #ccc;
        }
    }
</style>



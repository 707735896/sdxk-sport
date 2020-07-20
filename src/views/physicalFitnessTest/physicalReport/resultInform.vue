<template>
    <div class="resultInform">
        <div class="content-box">
            <div class="title">
                体测结果通知
            </div>
            <Form ref="formInline" :model="req" inline>
                <FormItem label="学校" :label-width="58">
                    <i-select style="width:260px;" filterable v-model="req.dep_id" :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="通知状态" :label-width="72">
                    <i-select style="width:106px" v-model="req.status">
                        <Option :value="0">全部</Option>
                        <Option :value="1">已通知</Option>
                        <Option :value="2">未通知</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="btn-box">
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/email.png"/>
                    <span style="position: relative;top: -4px">&nbsp;邮件</span>
                </div>
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/app.png"/>
                    <span style="position: relative;top: -4px">&nbsp;应用</span>
                </div>
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/message.png"/>
                    <span style="position: relative;top: -4px">&nbsp;短信</span>
                </div>

            </div>
            <BaseTable ref="selection" :columns="columns" :data="data"></BaseTable>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="totalRecords"
                  :current="filterForm.page"
                  show-total
                  show-elevator
                  show-sizer
                  :page-size-opts="[10,20,50,100]"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
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
                            return h('span', null, params.row.status === 0 ? '未通知' : '已通知')
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
                filterForm: {
                    page: 1,
                    size: 10
                },
                schoolList: [],
                is_manage: true
            };
        },
        methods: {
            getSchoolList() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            initSearch(){
                this.filterForm.page = 1;
            },
            search(){

            },
            pageChange(page) {
                this.filterForm.page = page;
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },
            inform() {
                // this.$Message.success('已发送');
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSchoolList();
        },
    };
</script>

<style lang="scss">

</style>

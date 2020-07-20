<template>
    <div class="content-box exports">
        <div class="title">体质监测数据批量导出</div>
        <Divider dashed/>
        <div class="form-main">
            <Form ref="obj" :model="req" inline label-position="left">
                <div class="rows">
                    <FormItem label="所属区域" :label-width="100" style="margin-right: 0 !important;" prop="p_area">
                        <i-select v-model="req.p_area" style="width:150px;" @on-change="areaChange" :disabled="!is_manage">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="" :label-width="0" prop="c_area">
                        <i-select v-model="req.c_area" style="width:150px;" :disabled="!is_manage">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="学校名称" :label-width="100" style="margin-left: 60px;" prop="school_id">
                        <i-select style="width:300px" v-model="req.school_id" filterable @on-change="schoolChange"
                                  :disabled="!is_manage">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                </div>
                <div class="rows">
                    <FormItem label="年级-班级" :label-width='100' style="margin-right: 0 !important;" prop="grade_no">
                        <i-select v-model="req.grade_no" style="width:150px;" @on-change="gradeChange">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="" :label-width="0" prop="class_no">
                        <i-select v-model="req.class_no" style="width:150px;">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}
                            </i-option>
                        </i-select>
                    </FormItem>

                    <FormItem label="监测学年" :label-width="100" style="margin-left: 60px;" prop="term">
                        <i-select style="width:300px" v-model="req.med_year">
                            <i-option value="-1">全部</i-option>
                            <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </Option>
                        </i-select>
                    </FormItem>
                </div>
                <!--<div class="rows">-->

                <!--<FormItem label="医疗机构" :label-width='100' prop="hos_dep">-->
                <!--<i-select v-model="req.hos_dep" style="width:304px">-->
                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                <!--<i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}-->
                <!--</i-option>-->
                <!--</i-select>-->
                <!--</FormItem>-->
                <!--<FormItem label="体检类型" :label-width='100' style="margin-left: 60px;" prop="med_type">-->
                <!--<i-select v-model="req.med_type" style="width:300px">-->
                <!--&lt;!&ndash;<Option value="-1">全部</Option>&ndash;&gt;-->
                <!--<Option :value="1">健康体检</Option>-->
                <!--<Option :value="2">升学体检</Option>-->
                <!--</i-select>-->
                <!--</FormItem>-->
                <!--</div>-->
            </Form>

            <Button type="primary" class="search-btn" @click="search" style="float: right;margin-right: 40px;">导出
            </Button>
        </div>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import qs from 'qs';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'monitorDataExport',
        data() {
            return {
                req: {
                    p_area: '-1',
                    c_area: '-1',
                    school_id: '-1',
                    med_type: '-1',
                    med_year: todayYear(),
                    grade_no: '-1',
                    class_no: '-1',
                    hos_dep: '-1'
                },
                areaList: [],
                areaList1: [],
                schoolList: [],
                yearList: [],
                gradeList: [],
                classList: [],
                hospitalList: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition(type) {
                this.yearList = yearLists().reverse();

                Promise.all([
                    this.$ajax({ // 区域
                        url: urls.area_all_list,
                        data: {}
                    }),
                    this.$ajax({
                        // 学校
                        url: urls.dept_all_list,
                        data: {
                            dep_id: sessionStorage.getItem('dep_id')
                        }
                    })
                ]).then(([value1, value2]) => {
                    this.areaList = value1.data.filter((item) => item.type === 2);

                    let arr1 = [], arr2 = [];
                    value2.data.forEach((item) => {
                        if (item.type === 2) {
                            arr1.push(item);
                        } else if (item.type === 3) {
                            arr2.push(item);
                        }
                    });
                    this.schoolList = arr1;
                    this.hospitalList = arr2;
                    if(!this.is_manage){
                        let dep_id = sessionStorage.getItem('dep_id');
                        this.schoolChange(dep_id);
                        let c_area = '';

                        value2.data.forEach(item => {
                            if (item.id === dep_id) {
                                this.req.c_area = item.area_id;
                                c_area = item.area_id;
                            }
                        });

                        value1.data.forEach(item => {
                            if(item.id === c_area){
                                this.req.p_area = item.pid;
                            }
                        });
                        this.areaList1 = value1.data;
                    }
                });
            },
            search() {
                let data = {};
                if (this.req.p_area !== '-1') {
                    data.p_area = this.req.p_area;
                }
                if (this.req.c_area !== '-1') {
                    data.c_area = this.req.c_area;
                }
                if (this.req.school_id !== '-1') {
                    data.school_id = this.req.school_id;
                }
                // if (this.req.med_type !== '-1') {
                //     data.med_type = this.req.med_type;
                // }
                if (this.req.med_year !== '-1') {
                    data.med_year = this.req.med_year;
                }

                if (this.req.grade_no !== '-1') {
                    data.grade_no = this.req.grade_no;
                }
                if (this.req.class_no !== '-1') {
                    data.class_no = this.req.class_no;
                }

                // if (this.req.hos_dep !== '-1') {
                //     data.hos_dep = this.req.hos_dep;
                // }
                //_id=2B0B57B0CD304035A5D7762DF4EB8111&med_year=2019
                data.import_people = sessionStorage.getItem('user_name');
                try {
                    window.location.href = urls.monitor_data_exports + '?' + qs.stringify(data);
                } catch (e) {

                }
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
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                /// =========== 所属年级
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        term: this.req.term ? this.req.term : null,
                        year: this.req.year === '-1' ? null : this.req.year,
                        grade_no: this.req.grade_no ? this.req.grade_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
        },
        created() {
            if (sessionStorage.getItem('roleCode') !== '999') {
                this.is_manage = false;
                this.req.school_id = sessionStorage.getItem('dep_id');
                this.schoolChange(this.req.school_id);
            }
            this.getSelectCondition();
        }
    };
</script>
<style lang="less">
    .exports {
        .ivu-select-input,
        .ivu-input,
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            font-size: 16px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
        }

        .form-main {
            width: 950px;
            height: 500px;
            margin: 112px auto auto;
        }

        .rows {
            margin-bottom: 40px;
        }

        .ivu-form-item-label {
            color: #999999;
            font-size: 18px;
        }
    }
</style>

<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                class="addCheckList"
                :mask-closable="false"
                @on-cancel="close"
                :width="500"
                footer-hide
        >
            <Form inline ref="obj" :model="obj" label-position="top" class="modal-form">
                <FormItem label="学校名称">
                    <!-- <i-select style="width:190px" v-model="obj.dep_id" filterable
                              :disabled="flag">
                        <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                    </i-select> -->
                    <i-input style="width:190px" :disabled="flag" v-model.trim="obj.dep_id"></i-input>
                </FormItem>
                <FormItem label="学年">
                    <!-- <i-select style="width:102px" v-model="obj.year" :disabled="flag">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select> -->
                    <i-input style="width:102px" :disabled="flag" v-model.trim="obj.year"></i-input>
                </FormItem>
                <FormItem label="学期">
                    <!-- <i-select style="width:102px" v-model="obj.term" :disabled="flag">
                        <Option :value="1">第一学期</Option>
                        <Option :value="2">第二学期</Option>
                    </i-select> -->
                     <i-input style="width:102px" :disabled="flag" v-model.trim="obj.term"></i-input>
                </FormItem>
                <FormItem label="所属年级">
                    <!-- <i-select style="width:90px" v-model="obj.grade_no" :disabled="flag" @on-change="gradeChange">
                        <i-option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</i-option>
                    </i-select> -->
                    <i-input style="width:90px" :disabled="flag" v-model.trim="obj.grade_no"></i-input>
                </FormItem>
                <FormItem label="班级">
                    <!-- <i-select style="width:90px" v-model="obj.class_no" :disabled="flag">
                        <i-option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</i-option>
                    </i-select> -->
                     <i-input style="width:90px" :disabled="flag" v-model.trim="obj.class_no"></i-input>
                </FormItem>
                <FormItem label="学籍号">
                    <i-input style="width:214px" :disabled="flag" v-model.trim="obj.student_code"></i-input>
                </FormItem>
                <FormItem label="姓名">
                    <i-input style="width:90px" :disabled="flag" v-model.trim="obj.student_name"></i-input>
                </FormItem>
                <FormItem label="性别">
                    <i-select style="width:90px" v-model="obj.gender" :disabled="flag">
                        <i-option :value="1">男</i-option>
                        <i-option :value="2">女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年龄">
                    <i-input style="width:102px" :maxlength="20" :disabled="flag" v-model.trim="obj.age"></i-input>
                </FormItem>
                <FormItem label="是否住宿">
                    <i-select style="width:102px" v-model="obj.is_boarding" :disabled="flag">
                        <Option :value="1">是</Option>
                        <Option :value="2">否</Option>
                    </i-select>
                </FormItem>
                <FormItem label="户籍类型">
                    <i-select style="width:90px" v-model="obj.household_type" :disabled="flag">
                        <Option :value="1">城镇</Option>
                        <Option :value="2">农村</Option>
                    </i-select>
                </FormItem>

                <FormItem label="证件类型">
                    <i-select style="width:90px" v-model="obj.card_type" :disabled="flag"
                              @on-change="(value)=>this.card_flag = value === 1">
                        <Option :value="1">身份证</Option>
                        <Option :value="2">护照</Option>
                        <!--<Option :value="3">户口簿</Option>-->
                    </i-select>
                </FormItem>
                <FormItem v-show="card_flag" label="证件号" style="margin-bottom: 26px;">
                    <i-input style="width:214px" v-model.trim="obj.card_num" key="1"
                             :maxlength="18" :disabled="flag" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem v-if="!card_flag" label="证件号" style="margin-bottom: 26px;">
                    <i-input style="width:214px" :disabled="flag" v-show="!card_flag" v-model.trim="obj.card_num1" key="2"
                             :maxlength="9" placeholder="请输入"></i-input>
                </FormItem>

                <!-- <div class="type">既往病史</div>
                <i-table class="tables" :columns="columns1" :data="tableData1"></i-table> -->
                <div class="type-child" style="margin-top: 10px; width:420px">既往病史</div>
                <i-input type="textarea" v-model.trim="obj.other_history" :disabled="flag"></i-input>
<!--
                <div class="type">残疾<span style="color:red;">*</span></div>
                <i-table class="tables" :columns="columns2" :data="tableData2"></i-table>
                <div class="type-child" style="margin-top: 10px">其他病史说明</div>
                <i-input type="textarea" v-model.trim="disease.other_dis" :disabled="flag"></i-input> -->
            </Form>
            <!-- <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import {dateFormatFromString, yearLists} from '@/libs/dateUtils';

    export default {
        name: 'addChecklist',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                card_flag: true,
                obj: {
                    dep_id: '',
                    year: '',
                    term: '',
                    grade_no: '',
                    class_no: '',
                    student_code: '',
                    student_name: '',
                    gender: '',
                    household_type: '',
                    is_boarding: '',
                    card_type: '',
                    card_num: '',
                    card_num1: '',
                    other_history:'',
                    age:''
                }
            };
        },
        methods: {
            search() {
                this.$ajax({
                    url: urls.monitorStudent_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj.dep_id = data.data.school_name;
                        this.obj.year = data.data.year;
                        this.obj.term = data.data.term === 1?'第一学期':'第二学期';
                        this.obj.grade_no = data.data.grade_name;
                        this.obj.class_no = data.data.class_name;
                        this.obj.student_code = data.data.student_code;
                        this.obj.student_name = data.data.student_name;
                        this.obj.gender = data.data.gender;
                        this.obj.household_type = data.data.household_type;
                        this.obj.is_boarding = data.data.is_boarding;
                        this.obj.card_type = data.data.card_type;
                        this.obj.age = data.data.age;
                        this.obj.other_history = data.data.anamnesis;
                        // this.obj.card_num = data.data.card_num;
                        if (data.data.card_type === 1) {
                            this.obj.card_num = data.data.card_num;
                            this.card_flag = true;
                        } else if(data.data.card_type === 2){
                            this.obj.card_num1 = data.data.card_num;
                            this.card_flag = false;
                        }else {
                            this.obj.card_num = data.data.card_num;
                            this.card_flag = true;
                        }
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        mounted() {
            if (this.id) {
                // if (sessionStorage.getItem('roleCode') !== '999') {
                //     this.is_manage = false;
                //     // this.obj.dep_id = sessionStorage.getItem('dep_id');
                //     // this.schoolChange(sessionStorage.getItem('dep_id'));
                // }
                this.search();
            }
        }
    };
</script>

<style lang="less">
    .addCheckList {
        .ivu-modal-body {
            padding: 16px 20px 40px 34px!important;
            .ivu-input-wrapper {
                width: 420px;
            }
        }
        .modal-form.ivu-form-item {
            margin-right: 10px !important;
        }

        .ivu-form .ivu-form-item {
            margin-right: 10px !important;
        }

        .tables {
            overflow: inherit;

            .ivu-date-picker-rel .ivu-input {
                padding-left: 0;
                padding-right: 22px;
            }
        }

        .type {
            font-size: 16px;
            font-weight: bold;
            margin: 19px 0;
        }

        .type-child {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-top: 29px;
        }

        .ivu-radio-group, .ivu-checkbox-group {
            margin-left: 20px;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            background: rgba(255, 255, 255, 0);
            border: 1px solid rgba(173, 173, 173, 1);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 114, 0, 1);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }

</style>

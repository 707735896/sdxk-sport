<template>
    <div>
        <Modal
            :title="title"
            :value="true"
            :width="644"
            class="classModal"
            :mask-closable="false"
            @on-cancel="close"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <!--<FormItem label="学年" prop="year">-->
                <!--<DatePicker type="year" format="yyyy" v-model="obj.year" style="width: 200px" placeholder="请选择"></DatePicker>-->
                <!--</FormItem>-->
                <!--<FormItem label="学期" prop="term">-->
                <!--<i-select v-model="obj.term" style="width:200px">-->
                <!--<i-option :value='1'>第一学期</i-option>-->
                <!--<i-option :value='2'>第二学期</i-option>-->
                <!--</i-select>-->
                <!--</FormItem>-->
                <FormItem label="所属学校" prop="dep_id">
                    <i-select v-model="obj.dep_id" filterable style="width:200px"
                              @on-change="schoolChange" :disabled="!is_manage">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_no">
                    <i-select v-model="obj.grade_no" style="width:200px">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="class_no">
                    <i-input v-model.trim="obj.class_no" :maxlength="20" style="width: 200px"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="班主任" prop="class_teacher">
                    <i-select v-model="obj.class_teacher" style="width:200px">
                        <i-option v-for="item of headmaster" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体育老师" prop="physical_teacher">
                    <i-select v-model="obj.physical_teacher" style="width:200px">
                        <i-option v-for="item of sportsTeacher" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级代号" prop="code">
                    <i-input v-model.trim="obj.code" :maxlength="20" style="width: 200px"
                             placeholder="请输入"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="co-btn close" @click='close'>取消</button>
                <button type="button" class="co-btn confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {getAllDep} from '@/api/basicData';

    export default {
        name: 'AddClass',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                grade_name: '',
                obj: {
                    // year: '',
                    // term: '',
                    dep_id: '',
                    grade_no: '',
                    class_no: '',
                    class_teacher: '',
                    physical_teacher: '',
                    code:''
                },
                rules: {
                    // year: [{required: true, type: 'date', message: '请选择学年'}],
                    // term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    dep_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请输入班级名称', trigger: 'blur'}],
                    class_teacher: [{required: true, message: '请选择班主任', trigger: 'change'}],
                    physical_teacher: [{required: true, message: '请选择体育老师', trigger: 'change'}],
                    code: [{required: true, message: '请输入班级代号', trigger: 'blur'}],
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                headmaster: [],
                sportsTeacher: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                getAllDep().then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === type);
                        if (!this.id) {
                            this.schoolChange(this.obj.dep_id);
                        }
                    } else {
                        this.schoolList = [];
                    }
                })
            },
            getTeacher(value) {

                this.$ajax({
                    /// =========== 所属年级
                    url: urls.teacher_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        let classTeacher = [];
                        let phiTeacher = [];
                        data.data.map(item => {
                            if (item.type === 1 && item.dep_id === value) { // 1 班主任
                                classTeacher.push(item);
                            } else if (item.type === 2 && item.dep_id === value) { // 2 体育老师
                                phiTeacher.push(item);
                            }
                        });
                        this.headmaster = classTeacher;
                        this.sportsTeacher = phiTeacher;
                    } else {
                        this.headmaster = [];
                        this.sportsTeacher = [];
                    }
                }, err => {
                    window.console.log(err);
                });
            },
            schoolChange(value) {
                this.obj.grade_no = '';
                this.obj.class_teacher = '';
                this.obj.physical_teacher = '';
                this.getTeacher(value);
                if (value === -1) {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    return;
                }
                this.$ajax({
                    url: urls.grade_no_list,
                    data: {
                        garde: temp[0].nature
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
            search() {
                Promise.all([getAllDep(), this.$ajax({
                    url: urls.class_info,
                    data: {
                        id: this.id
                    }
                })]).then(value => {
                    let list = value[0].data || [];
                    this.schoolList = list.filter((item) => item.type === 2);
                    let json = value[1];
                    if (json.code === 200) {
                        const {dep_id,grade_no , class_no, class_teacher, physical_teacher,code} = json.data;
                        this.schoolChange(dep_id);
                        this.obj = {
                            dep_id: dep_id,
                            grade_no: grade_no,
                            class_no: class_no,
                            class_teacher: class_teacher,
                            physical_teacher: physical_teacher,
                            code:code
                        };
                    }
                })
            },
            confirms() {
                if (this.id) {
                    let temp1 = this.headmaster.some(item => item.id === this.obj.class_teacher);
                    if (!temp1) {
                        this.obj.class_teacher = '';
                    }
                    let temp2 = this.sportsTeacher.some(item => item.id === this.obj.physical_teacher);
                    if (!temp2) {
                        this.obj.physical_teacher = '';
                    }
                }

                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    const {dep_id, grade_no, class_no, class_teacher, physical_teacher,code} = this.obj;
                    let data = {
                        dep_id: dep_id,
                        grade_no: grade_no,
                        class_no: class_no,
                        class_teacher: class_teacher,
                        physical_teacher: physical_teacher,
                        code:code
                    };
                    if (this.id) { // 编辑
                        data.id = this.id;
                        this.$ajax({
                            url: urls.class_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + this.obj.class_no + '班级成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        this.$ajax({
                            url: urls.class_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.class_no + '班级成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999') {
                this.is_manage = false;
            }

            if (this.id) { //编辑
                this.search();
            } else {
                this.getSelectCondition(2);
                if (code !== '999') {
                    this.obj.dep_id = sessionStorage.getItem('dep_id');
                }
            }
        }
    };
</script>
<style lang="less">
    .classModal {
        .ivu-form {
            padding-left: 66px;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        /*.ivu-modal-footer {*/
        /*border: none;*/
        /*padding: 0 38px 34px;*/
        /*}*/

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .co-btn {

            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            border-radius: 4px;
            cursor: pointer;
        }

        .close {
            width: 70px;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
        }

        .confirm {
            width: 70px;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border: none;
        }
    }
</style>

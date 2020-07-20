<template>
    <div>
        <Modal
            :title="title"
            :value="true"
            :width="750"
            class="studentModal1"
            :mask-closable="false"
            :footer-hide="flag"
            @on-cancel="close"
        >
            <div class="edit clearfix">
                <Row :gutter="36">
                    <i-col span="5">
                        <div class="img">
                            <img :src="obj.photos" alt="学籍照" @click="triggerUpload" style="cursor: pointer;"
                                 title="选择照片上传">
                            <Upload
                                v-if="!disabled"
                                ref="upload"
                                :show-upload-list="false"
                                name="uploadFile"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :data="fileType"
                                :max-size="1048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :action="uploadUrl"
                                style="display: inline-block;width:58px;">
                                <a href="javascript:void(0)" title="选择照片上传">学籍照</a>
                            </Upload>
                        </div>
                    </i-col>
                    <i-col span="19">
                        <Form ref="obj" :model="obj" :rules="rules" label-position="top">
                            <Row :gutter="16">

                                <i-col span="8">
                                    <FormItem label="姓名" prop="name" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.name" :disabled="disabled" :maxlength="20"
                                                 placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="性别" prop="gender" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.gender" :disabled="disabled">
                                            <i-option :value='1'>男</i-option>
                                            <i-option :value='2'>女</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="民族" prop="nation" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.nation" :disabled="disabled"
                                                 :maxlength="10" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="学籍号" prop="code" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.code" :maxlength="20" :disabled="disabled"
                                                 placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>

                                <!--<i-col span="8">-->
                                <!--<FormItem label="学号" prop="stu_num" style="margin-bottom: 20px;">-->
                                <!--<i-input v-model.trim="obj.stu_num" :disabled="disabled"-->
                                <!--:maxlength="9"></i-input>-->
                                <!--</FormItem>-->
                                <!--</i-col>-->
                                <i-col span="8">
                                    <FormItem label="户籍类型" prop="household_type" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.household_type" :disabled="disabled">
                                            <i-option :value='1'>城镇</i-option>
                                            <i-option :value='2'>农村</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>

                                <i-col span="8">
                                    <FormItem label="是否住宿" prop="is_boarding" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.is_boarding" :disabled="disabled">
                                            <i-option :value='1'>是</i-option>
                                            <i-option :value='2'>否</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="证件类型" prop="card_type" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.card_type" :disabled="disabled" @on-change="typeChange">
                                            <i-option :value='1'>身份证</i-option>
                                            <i-option :value='2'>护照</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem v-if="card_flag" label="证件号" prop="card_num" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.card_num" key="1" :disabled="disabled"
                                                 :maxlength="18" @on-blur="idBlur" placeholder="请输入"></i-input>
                                    </FormItem>
                                    <FormItem v-if="!card_flag" label="证件号" prop="card_num1"
                                              style="margin-bottom: 20px;">
                                        <i-input v-if="!card_flag" v-model.trim="obj.card_num1" key="2"
                                                 :disabled="disabled" :maxlength="9" placeholder="请输入"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem v-if="card_flag" label="出生日期" prop="birthday1"
                                              style="margin-bottom: 20px;">
                                        <DatePicker format="yyyy.MM.dd" v-model="obj.birthday1" key="3"
                                                    :disabled="true"></DatePicker>
                                    </FormItem>
                                    <FormItem v-if="!card_flag" label="出生日期" prop="birthday2"
                                              style="margin-bottom: 20px;">
                                        <DatePicker format="yyyy.MM.dd" v-model="obj.birthday2" key="4"></DatePicker>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第一监护人" prop="guardian1" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1" :disabled="disabled"
                                                 :maxlength="15" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="guardian1_phone" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1_phone" :disabled="disabled"
                                                 :maxlength="11" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="工作类型" prop="guardian1_type" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1_type" :disabled="disabled"
                                                 :maxlength="10" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第二监护人" prop="guardian2" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2" :disabled="disabled"
                                                 :maxlength="15" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="guardian2_phone" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2_phone" :disabled="disabled"
                                                 :maxlength="11" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="工作类型" prop="guardian2_type" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2_type" :disabled="disabled"
                                                 :maxlength="10" placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </i-col>
                </Row>
            </div>
            <!--<span class="addschool" v-if="!disabled" @click="addtable">-->
            <!--<img src="../../../assets/unit/add.png" alt="add">-->
            <!--<span>新增</span>-->
            <!--</span>-->
            <i-table v-if="!!id" center :disabled-hover='true' size="small" :columns="columns" height="120"
                     :data="tableData"></i-table>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>

        <Modal
            title="新增页面"
            :value="tableModal"
            :width="644"
            :mask-closable="false"
            class="studentModal2"
            @on-cancel="tableclose"
            class-name="vertical-center-modal"
        >
            <i-form
                ref="tableform"
                :model="tableform"
                :rules="tablerules"
                inline
                label-position="top">
                <FormItem label="学校名称" prop="dep_id" style="margin-left: 80px;">
                    <i-select v-model="tableform.dep_id" filterable style="width:200px" @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" prop="year">
                    <DatePicker type="year" format="yyyy" @on-change="gradeChange" v-model.trim="tableform.year"
                                style="width: 200px"
                                placeholder="请选择" :disabled="flag"></DatePicker>
                </FormItem>
                <FormItem label="学期" prop="term" style="margin-left: 80px;">
                    <i-select v-model="tableform.term" style="width:200px" @on-change="gradeChange">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_no">
                    <i-select v-model="tableform.grade_no" style="width:200px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="class_no" style="margin-left: 80px;">
                    <i-select v-model="tableform.class_no" style="width:200px">
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
            </i-form>

            <div slot="footer">
                <div>
                    <button type="button" class="close" @click='tableclose'>取消</button>
                    <button type="button" class="confirm" @click='tableconfirms'>确定</button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {dateFormatFromString} from '@/libs/dateUtils';

    export default {
        name: 'EditStudent',
        props: ['id', 'title', 'flag'],
        data() {
            function valids(rule, value, callback) {
                console.log(value);
                if (!value) {
                    callback(new Error('请输入证件号'));
                } else {
                    if (!/^[0-9]{17}[0-9X]$/.test(value)) {
                        callback(new Error('证件号格式错误'));
                    } else {
                        callback();
                    }
                }
            }

            return {
                card_flag: true,
                obj: {
                    code: '',
                    // stu_num: '',
                    name: '',
                    gender: '',
                    nation: '',
                    birthday1: '',
                    birthday2: '',
                    card_type: '',
                    card_num: '',
                    card_num1: '',
                    household_type: '',
                    is_boarding: '',
                    guardian1: '',
                    guardian1_phone: '',
                    guardian1_type: '',
                    guardian2: '',
                    guardian2_phone: '',
                    guardian2_type: '',
                    photos: require('@/assets/unit/default.png')
                },
                rules: {
                    code: [{required: true, message: '请输入学籍号', trigger: 'blur'},
                        // {len: 19, message: '长度为19位', trigger: 'blur'},
                        // {pattern: /^[A-Z]{1}[0-9]+[0-9X]$/, message: '首位字符为大写字母', trigger: 'blur'}
                    ],
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    nation: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    // stu_num: [{required: true, message: '请输入学号', trigger: 'blur'},
                    //     {pattern: /^[0-9]{9}$/, message: '学号长度为9位数字', trigger: 'blur'}],
                    birthday1: [{required: true, type: 'date', message: '请输入出生日期', trigger: 'blur'}],
                    birthday2: [{required: true, type: 'date', message: '请输入出生日期', trigger: 'blur'}],
                    is_boarding: [{required: true, type: 'number', message: '请选择是否住宿', trigger: 'change'}],
                    household_type: [{required: true, type: 'number', message: '请选择户籍类型', trigger: 'change'}],
                    card_type: [{required: true, type: 'number', message: '请选择证件类型', trigger: 'change'}],
                    // card_num: [{validator: valids, trigger: 'blur'}],
                    card_num: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                        {pattern: /^[0-9]{17}[0-9X]$/, message: '证件号格式错误', trigger: 'blur'}
                    ],
                    card_num1: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                        {len: 9, message: '长度为9位', trigger: 'blur'},
                        {pattern: /^[A-Z]{1,2}[0-9]{7,8}$/, message: '证件号为大写字母开头和数字组合', trigger: 'blur'}],
                    guardian1: [{required: true, message: '请输入第一监护人', trigger: 'blur'}],
                    guardian1_phone: [{required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}],
                    guardian2_phone: [{pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}]
                },
                columns: [
                    {
                        title: ' ',
                        width: 10,
                    },
                    {
                        title: '学校',
                        key: 'dep_id'
                    },
                    {
                        title: '学年',
                        key: 'year',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '学期',
                        key: 'term'
                    },
                    {
                        title: '年级',
                        key: 'grade_no',
                    },
                    {
                        title: '班级',
                        key: 'class_no'
                    }
                ],
                tableData: [],
                uploadUrl: urls.uploadImage,
                fileType: {
                    filetype: 1
                },
                unitList: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    dep_id: null,
                    year: null,
                    term: null,
                    grade_no: null,
                    class_no: null
                },
                tablerules: {
                    dep_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    year: [{required: true, type: 'date', message: '请选择学年', trigger: 'blur'}],
                    term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请输入班级名称', trigger: 'change'}]
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                birth1: '',
                birth2: '',
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校列表
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter(item => item.type === 2);
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            search() {
                this.$ajax({
                    url: urls.student_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        const {
                            code, name, gender, nation, birthday, card_type,
                            card_num, household_type, is_boarding, guardian1, guardian1_phone, guardian1_type,
                            guardian2, guardian2_phone, guardian2_type, photos
                        } = data.data;
                        // this.obj = {
                        //     code: code,
                        //     // stu_num: data.data.stu_num,
                        //     name: name,
                        //     gender: gender,
                        //     nation: nation,
                        //     birthday1: '',
                        //     birthday2: '',
                        //     card_type: card_type,
                        //     // card_num: card_num,
                        //     household_type: household_type,
                        //     is_boarding: is_boarding,
                        //     guardian1: guardian1,
                        //     guardian1_phone: guardian1_phone,
                        //     guardian1_type: guardian1_type,
                        //     guardian2: guardian2,
                        //     guardian2_phone: guardian2_phone,
                        //     guardian2_type: guardian2_type,
                        //     photos: photos
                        // };
                        var obj = {
                            code: code,
                            // stu_num: data.data.stu_num,
                            name: name,
                            gender: gender,
                            nation: nation,
                            birthday1: '',
                            birthday2: '',
                            card_type: card_type,
                            // card_num: card_num,
                            household_type: household_type,
                            is_boarding: is_boarding,
                            guardian1: guardian1,
                            guardian1_phone: guardian1_phone,
                            guardian1_type: guardian1_type,
                            guardian2: guardian2,
                            guardian2_phone: guardian2_phone,
                            guardian2_type: guardian2_type,
                            photos: photos
                        }

                        if (data.data.card_type === 1) {
                            obj.card_num = data.data.card_num;
                            obj.card_flag = true;
                            obj.birthday1 = birthday ? new Date(birthday.replace(/\./g, '/')) : '';

                        } else {
                            obj.card_num1 = data.data.card_num;
                            obj.card_flag = false;
                            obj.birthday2 = birthday ? new Date(birthday.replace(/\./g, '/')) : '';
                        }
                        this.obj = obj;

                        this.tableData = data.data.edu_records || [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            handleSuccess(res) {
                if (res.code === 200) {
                    this.obj.photos = res.url;
                } else {
                    this.$Message.error(res.error);
                }
            },
            handleFormatError() {
                this.$Message.warning('请选择jpg、jpeg、png格式的图片');
            },
            handleMaxSize() {
                this.$Message.warning('图片大小限制在1M以内');
            },
            triggerUpload() {
                if (!this.flag) {
                    this.$refs.upload.$el.querySelector('.ivu-upload-input').click();
                }
            },
            idBlur(event) {
                var value = event.target.value;
                if (value.length === 18) {
                    var y = value.substr(6, 4);
                    let m = value.substr(10, 2);
                    let d = value.substr(12, 2);
                    this.$set(this.obj, 'birthday1', new Date(y + '/' + m + '/' + d));
                    // this.obj.birthday1 = new Date(y + '/' + m + '/' + d);
                } else {
                    this.$set(this.obj, 'birthday1', '');
                    // this.obj.birthday1 = '';
                }
            },
            typeChange(value) {
                this.card_flag = value === 1;
                // if(value === 1){
                //     let card_num = this.obj.card_num;
                //     if (card_num.length === 18) {
                //         var y = card_num.substr(6, 4);
                //         let m = card_num.substr(10, 2);
                //         let d = card_num.substr(12, 2);
                //         this.obj.birthday = new Date(y + '/' + m + '/' + d);
                //     }
                // }
            },
            delete(index) {
                this.tableData.splice(index, 1);
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    // if (!this.obj.photos) {
                    //     this.$Message.error('请上传学籍照！');
                    //     return false;
                    // }

                    // if (!this.tableData.length) {
                    //     this.$Message.error('教育履历至少有一条！');
                    //     return false;
                    // }
                    let data = {};
                    let obj = this.obj;
                    data.studentInfo = {
                        id: this.id,
                        code: obj.code,
                        // stu_num: this.obj.stu_num,
                        name: obj.name,
                        gender: obj.gender,
                        nation: obj.nation,
                        // birthday: dateFormatFromString(this.obj.birthday).replace(/\//g, '.'),
                        card_type: obj.card_type,
                        // card_num: this.obj.card_num,
                        household_type: obj.household_type,
                        is_boarding: obj.is_boarding,
                        guardian1: obj.guardian1,
                        guardian1_phone: obj.guardian1_phone,
                        guardian1_type: obj.guardian1_type,
                        guardian2: obj.guardian2,
                        guardian2_phone: obj.guardian2_phone,
                        guardian2_type: obj.guardian2_type,
                        photos: obj.photos
                    };

                    if (obj.card_type === 1) {
                        data.studentInfo.card_num = obj.card_num;
                        data.studentInfo.birthday = dateFormatFromString(obj.birthday1).replace(/\//g, '.');

                    } else {
                        if (obj.card_num1.length === 8) {
                            data.studentInfo.card_num = '0' + obj.card_num1;
                        } else {
                            data.studentInfo.card_num = obj.card_num1;
                        }
                        data.studentInfo.birthday = dateFormatFromString(obj.birthday2).replace(/\//g, '.');
                    }
                    data.studentInfo.edu_records = this.tableData.map(item => {
                        let items = {};
                        if (item.id) {
                            items.id = item.id;
                        }
                        items.student_id = this.id;
                        items.dep_id = item.dep_id;
                        items.year = item.year;
                        items.term = item.term;
                        items.grade_no = item.grade_no;
                        items.class_no = item.class_no;
                        return items;
                    });

                    if (this.id) {
                        // 编辑
                        this.$ajax({
                            url: urls.student_edit,
                            data: data.studentInfo
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('学生信息编辑成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else {
                        delete data.id;
                        // 编辑
                        this.$ajax({
                            url: urls.student_add,
                            data: data.studentInfo
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('学生信息编辑成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }


                });
            },
            close() {
                this.$emit('modal-close');
            },
            schoolChange(value) {
                this.tableform.grade_no = '';
                this.tableform.class_no = '';
                this.classList = [];
                /// =========== 所属年级
                let temp = this.schoolList.filter(({id}) => id === value);
                if (!temp.length) {
                    return false;
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
            gradeChange(value) {
                this.tableform.class_no = '';
                if (!this.tableform.grade_no) {
                    this.classList = [];
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: value,
                        dep_id: this.tableform.dep_id,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            addtable() {
                this.tableModal = true;
                this.$refs['tableform'].resetFields();
                this.tableform = {
                    dep_id: '',
                    year: null,
                    term: '',
                    grade_no: '',
                    class_no: ''
                };
            },
            tableclose() {
                this.tableModal = false;
            },
            tableconfirms() {
                let self = this;
                this.$refs['tableform'].validate(valid => {
                    if (!valid) {
                        self.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    for (var schoolindex = 0; schoolindex < self.schoolList.length; schoolindex++) {
                        if (self.schoolList[schoolindex].id === self.tableform.dep_id) {
                            self.tableform.school_name = self.schoolList[schoolindex].name;
                            break;
                        }
                    }
                    for (var gradeindex = 0; gradeindex < self.gradeList.length; gradeindex++) {
                        if (self.gradeList[gradeindex].id === self.tableform.grade_no) {
                            self.tableform.grade_name = self.gradeList[gradeindex].value;
                            break;
                        }
                    }

                    for (var classindex = 0; classindex < self.classList.length; classindex++) {
                        if (self.classList[classindex].id === self.tableform.class_no) {
                            self.tableform.class_name = self.classList[classindex].class_no;
                            break;
                        }
                    }
                    for (let i = 0, len = self.tableData.length; i < len; i++) {

                        let term = self.tableform.term === 1 ? '第一学期' : '第二学期';
                        if (self.tableData[i].dep_id === self.tableform.school_name &&
                            self.tableData[i].year === String(self.tableform.year.getFullYear()) &&
                            self.tableData[i].term === term &&
                            self.tableData[i].grade_no === self.tableform.grade_name) {
                            self.$Message.error('教育履历添加重复');
                            return false;
                        }
                    }

                    self.tableData.push({
                        dep_id: self.tableform.school_name,
                        year: self.tableform.year.getFullYear(),
                        term: self.tableform.term === 1 ? '第一学期' : '第二学期',
                        grade_no: self.tableform.grade_name,
                        class_no: self.tableform.class_name
                    });
                    self.tableModal = false;
                });
            }
        },
        created() {
            this.getSelectCondition();
            this.disabled = !!this.flag;
            if (this.flag) {
                this.rules = {};
            }

            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .studentModal1 {
        .ivu-modal-body {
            padding: 18px 28px;
            /*height: 570px;*/

            .ivu-form-item-label {
                color: #333 !important;
            }

            .ivu-row {
                margin-bottom: 0;
            }

            .ivu-form-label-top .ivu-form-item-label {
                padding-top: 4px !important;
                padding-bottom: 4px !important;
            }
        }

        .img {
            img {
                display: block;
                width: 100%;
            }
        }

        .ivu-upload {
            display: block !important;
            width: 100% !important;
            padding: 6px 10px;
            text-align: center;
            cursor: pointer;
        }

        .addschool {
            display: inline-block;
            margin-bottom: 12px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }

            img {
                position: relative;
                top: 5px
            }
        }

        .ivu-form-item {
            margin-right: 0 !important;
        }

        /*.ivu-modal-footer {*/
        /*border: none;*/
        /*padding: 17px 38px 17px;*/
        /*}*/

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .ivu-table td, .ivu-table th {
            height: 36px;
        }

        .delete {
            display: inline-block;
            color: #FF7200;
            padding: 4px 8px;
            cursor: pointer;
        }

        .delete:hover {
            background: ghostwhite;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }

    .studentModal2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
</style>

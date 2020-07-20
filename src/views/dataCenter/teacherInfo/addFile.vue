<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="400"
                class="addFile"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" label-position="left" :label-width="100">
                <FormItem label="学校名称" prop="dep_id">
                    <i-select v-model="obj.dep_id" filterable style="width:200px" :disabled="!is_manage">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="上传文件">
                    <label id="uplable" for="files">
                        <span style="font-size: 14px;">选择文件</span>
                        <input type="file" id="files" ref="file" @change="select">
                    </label><br>
                    <span>{{name}}</span>
                </FormItem>

            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>导入</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import axios from 'axios';

    export default {
        name: 'addFile',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                importUrl: urls.teacher_up,
                name: '',
                schoolList: [],
                header: {
                    'AuthToken': sessionStorage.getItem('token')
                },

                obj: {
                    dep_id: ''
                },
                rules:{
                    dep_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                },
                is_manage: true // 登陆人是否是管理员
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1,
                        dep_id:sessionStorage.getItem('dep_id')
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
            select() {
                var file = this.$refs.file.files[0];
                if (file) {
                    this.name = file.name;
                }else {
                    this.name = '';
                }
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        self.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    var file = this.$refs.file.files[0];
                    if (file) {
                        let arr = file.name.split('.');
                        if (arr[arr.length - 1] !== 'xls' && arr[arr.length - 1] !== 'xlsx') {
                            this.$refs.file.value = '';
                            this.$Message.error('请上传excel类型的文件');
                            return false;
                        }
                    }else {
                        this.$Message.error('请选择excel类型的文件');
                        return false;
                    }
                    let form = new FormData();
                    form.append('dep_id', this.obj.dep_id);
                    form.append('uploadFile', file);
                    // if (file.size / 1024 / 1024 > 1) {

                    // }
                    this.$Spin.show();
                    axios.post(this.importUrl, form, {
                        headers: {
                            'AuthToken': sessionStorage.getItem('token'),
                            'content-type': undefined
                        },
                        timeout: 10000,
                    }).then(data => data.data).then(data => {
                        this.$Spin.hide();
                        if(data.code === 200){
                            this.$Message.success('导入成功');
                            this.$emit('modal-close', true);
                        }else {
                            this.$Message.error(data.error);
                        }
                    }).catch(() => {
                        this.$Message.error('导入失败');
                    });
                })
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            if (sessionStorage.getItem('roleCode') !== '999') {
                this.is_manage = false;
                this.obj.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
        }

    };
</script>

<style lang="less">
    #uplable{
        position: relative;
        display: inline-block;
        width: 100px;
        height: 34px;
        padding: 5px 15px 5px;
        line-height: 23px;
        font-size: 12px;
        border-radius: 4px;
        font-weight: 400;
        text-align: center;
        touch-action: manipulation;
        background-image: none;
        white-space: nowrap;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
        background-color: #FF7B10 !important;
        color: #FEFEFE !important;
        border-color: #FF7B10 !important;
        cursor: pointer;
        #files{
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            clip: rect(1px,1px,1px,1px);
        }
    }
</style>

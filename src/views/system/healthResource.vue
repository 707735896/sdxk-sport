<template>
    <div class="functionalManage">
        <div class="content-box">
            <div class="title">
                健康资讯维护
            </div>
            <Form ref="formInline" :model="formInline" inline>
                <FormItem label="日期" :label-width="50">
                    <DatePicker type="date" style="width: 180px" placeholder="请选择日期"
                                v-model="searchList.send_date"></DatePicker>
                </FormItem>
                <FormItem label="关键字" :label-width="72" prop="keyword">
                    <Input type="text" v-model="searchList.keyword" style="width: 180px" :maxlength="20" clearable/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <div class="add" @click="add">
                    <img src="../../assets/system/role/add.png"/>
                    新增
                </div>
                <div class="add" @click="trash">
                    <img src="../../assets/system/role/delete.png"/>
                    删除
                </div>
            </div>
            <BaseTable ref="selection" :columns="columns" :data="data" @on-selection-change="selectionChange"></BaseTable>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current="pageConfig.page"
                  :page-size-opts="pageConfig.opts"
                  :page-size="pageConfig.size"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>
        <!-- 新增修改 -->
        <Modal
            class="functionalAddModal"
            :title="addtitle"
            v-model="showModal"
            :mask-closable="false"
            width='644'
            :styles="{top: '100px'}">
            <Form :model="addForm" label-position="top" ref="addForm" :rules="rules">
                <Row>
                    <Col span="24" class="leftFormItem">
                        <FormItem label="标题" prop="received_by">
                            <Input v-model="addForm.received_by" class="functionalName" style="width: 588px"
                                   :disabled="disabled"/>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem" style="width: 182px">
                        <FormItem label="作者" prop="title">
                            <Input v-model="addForm.title" class="functionalName" style="width: 178px"
                                   :disabled="disabled" placeholder="请输入作者"/>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem" style="width: 182px">
                        <FormItem label="日期" prop="start_time">
                            <DatePicker type="date" placeholder="选择时间" style="width: 178px" :disabled="disabled"
                                        v-model="addForm.start_time"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="24" class="leftFormItem">
                        <FormItem label="内容" prop="content">
                            <template>
                                <Upload :action="action" :max-size="2048" name="uploadFile" :data="fileType"
                                        :show-upload-list="false"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :on-format-error="handleFormatError"
                                        ref="upload"
                                        :headers="headers"
                                        :on-exceeded-size="exceededSize"
                                ></Upload>
                            </template>
                            <quill-editor v-model="addForm.content"
                                          ref="myQuillEditor"
                                          :options="editorOption" :disabled="disabled">
                            </quill-editor>
                        </FormItem>
                    </Col>
                    <Col span="24" class="leftFormItem">
                        <Row>
                            <span style="margin-right:20px;display: inline-block">是否添加为首页轮播图</span>
                            <div v-if="!disabled" style="display: inline-block">
                                <RadioGroup v-model="addForm.isFlag">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </div>

                            <div v-else style="display: inline-block">
                                <Radio v-model="disabledSingle" disabled v-if="addForm.isFlag === '1'">是</Radio>
                                <Radio v-model="disabledSingle" disabled v-else>否</Radio>
                                <div class="blankBox-gt"></div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <div class="footer" v-if="!disabled">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>
        <!-- 详情
        <Modal
                class="functionalAddModal"
                :title="addtitle"
                v-model="infoModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                         <FormItem label="标题" prop="received_by">
                            <Input v-model="addForm.received_by" class="functionalName" style="width: 588px" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6" class="leftFormItem" style="width: 182px">
                        <FormItem label="作者" prop="title">
                            <Input v-model="addForm.title" class="functionalName" style="width: 178px"
                                   placeholder="请输入作者" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="6" class="leftFormItem" style="width: 182px">
                        <FormItem label="日期" prop="start_time">
                            <DatePicker type="date" placeholder="请选择日期" style="width: 178px"
                                        v-model="addForm.start_time" disabled></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                        <FormItem label="内容">
                           <div class="detail" ref="content">
                           </div>

                        </FormItem>
                </Row>
                <Row>
                    <span style="margin-right:20px;">是否添加为首页轮播图</span>
                    <Radio v-model="disabledSingle" disabled v-if="addForm.isFlag === '1'">是</Radio>
                    <Radio v-model="disabledSingle" disabled v-else>否</Radio>
                </Row>
                <div class="footerBlock" style="margin-top: 60px"></div>
            </Form>
        </Modal> -->
    </div>
</template>
<script>
    import urls from '../../service/Urls';
    // import {datetimeformatFromString} from '../../libs/dateUtils';

    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    import {quillEditor} from 'vue-quill-editor';
    import {addQuillTitle} from '../../libs/quill-title';

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                searchList: {
                    keyword: null,
                    send_date: null
                },
                action: urls.uploadImage_wechat,
                headers: {
                    'AuthToken': sessionStorage.getItem('token')
                },
                fileType: {
                    filetype: 1
                },
                showModal: false,
                infoModal: false,
                addtitle: '',
                formInline: {
                    functionalName: '',
                    status: ''
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '日期',
                        key: 'publish_date',
                        // render: (h, params) => {
                        //     return h('span', null, datetimeformatFromString(params.row.publish_date));
                        // }

                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '94%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer'
                                    },
                                    domProps: {
                                        title: params.row.title
                                    }
                                }, params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '作者',
                        key: 'author',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer'
                                    },
                                    domProps: {
                                        title: params.row.author
                                    }
                                }, params.row.author)
                            ]);
                        }
                    },
                    {
                        title: '是否填为首页轮播图',
                        key: 'start_time',
                        render: (h, params) => {

                            return h('span', null, params.row.lbtype === 1 ? '是' : '否');
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../assets/system/role/info.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '详情')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../assets/system/role/edit.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '编辑')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                addForm: {
                    received_by: '',
                    title: '',
                    start_time: '',
                    content: '',
                    isFlag: '1',
                    accessorys: '',
                    image_url: '',//压缩图地址
                    image: '',//原图地址
                },
                rules: {
                    received_by: [{
                        required: true,
                        message: '请输入资讯标题',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        message: '标题不能超过50个字符',
                        max: 50,
                        trigger: 'change'

                    }],
                    title: [{
                        required: true,
                        message: '请输入作者',
                        trigger: 'blur'
                    }, {

                        type: 'string',
                        message: '作者不能超过10个字符',
                        max: 10,
                        trigger: 'change'

                    }],
                    start_time: [{
                        required: true,
                        message: '请输入开始时间',
                        trigger: 'blur',
                        type: 'date'
                    }],
                    content: [{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }],
                },
                rightForm: {},
                selectionValue: [],
                editorOption: {
                    // some quill options
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: [
                                ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                                ['blockquote', 'code-block'],     //引用，代码块
                                [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                                [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
                                [{'script': 'sub'}, {'script': 'super'}],   // 上下标
                                [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                                [{'direction': 'rtl'}, {'color': []}, {'background': []}],             // 文本方向
                                // [],     // 字体颜色，字体背景颜色

                                [{'size': ['small', false, 'large', 'huge']}], // 字体大小

                                [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题


                                [{'font': []}],     //字体
                                [{'align': []}],    //对齐方式


                                ['clean'],    //清除字体样式
                                ['link', 'image']
                            ],
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.ivu-upload-input').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
                id: null,
                disabledSingle: true,
                img_url: [],
                disabled: false,
            };
        },
        methods: {
            // 新增资讯
            add() {
                this.addtitle = '新增';
                this.showModal = true;
                this.disabled = false;
                this.addForm = {};
                this.id = null;
                this.addForm.isFlag = '1';
                this.img_url = [];
            },
            // 资讯详情
            info(row) {
                this.addtitle = '详情';
                this.disabled = true;
                // this.infoModal = true;
                this.addForm.title = row.author;
                this.addForm.received_by = row.title;
                this.addForm.start_time = row.publish_date;
                this.addForm.isFlag = row.lbtype + '';
                this.$ajax({
                    url: urls.healthyinfo_list_index,
                    data: {
                        id: row.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.addForm.content = data.data.content;
                        this.showModal = true;
                        // this.$refs.content.innerHTML = this.addForm.content
                    }
                });

            },
            // 编辑资讯
            edit(row) {
                this.img_url = [];
                this.addtitle = '编辑';
                this.disabled = false;
                this.id = row.id;
                this.addForm.title = row.author;
                this.addForm.received_by = row.title;
                this.addForm.start_time = row.publish_date;
                this.addForm.isFlag = row.lbtype + '';
                this.$ajax({
                    url: urls.healthyinfo_list_index,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.addForm.content = data.data.content;
                        this.addForm.image_url = data.data.img_url;
                        this.addForm.image = data.data.image;
                        this.showModal = true;
                    }
                });

            },
            closeaddModal() {
                this.showModal = false;
            },
            // 新增/编辑
            confirmaddModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    var content = this.addForm.content;
                    var reg = /src=\"(\S*)\"/;
                    var tmp = content.match(reg);
                    if (tmp) {
                        tmp[0] = tmp[0].replace(/&amp;/g, '&');
                        tmp[1] = tmp[1].replace(/&amp;/g, '&');
                    }
                    if (this.img_url.length !== 0 && tmp) {
                        this.addForm.image = tmp[1];
                        var ys_img = this.img_url.filter(item => {
                            return item[tmp[1]];
                        });
                        this.addForm.image_url = ys_img[0][tmp[1]];

                    } else {

                        this.addForm.image = tmp[1];
                        var reg = /^(.*)(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/;
                        if (tmp[1].match(reg)) {
                            var str = tmp[1].replace(reg, '$1_2$2');
                            this.addForm.image_url = str;
                        } else {
                            this.addForm.image_url = tmp[1] + '_2';
                        }
                    }
                    let healthyinfo = {
                        author: this.addForm.title,
                        content: this.addForm.content,
                        title: this.addForm.received_by,
                        publishdate: new Date(this.addForm.start_time).getTime(),
                        lbtype: this.addForm.isFlag * 1,
                        image: this.addForm.image,
                        img_url: this.addForm.image_url
                    };
                    // 编辑
                    if (this.id) {
                        healthyinfo.id = this.id;
                        this.$ajax({
                            url: urls.healthyinfo_update,
                            data: healthyinfo
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('编辑资讯成功');
                                this.$emit('modal-close', true);
                                this.getList();
                                this.addForm = {};
                                this.img_url = [];
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        }).catch(err => {

                        });
                        this.showModal = false;
                    } else {
                        // 新增资讯
                        this.$ajax({
                            url: urls.healthyinfo_add,
                            data: healthyinfo
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('新增资讯成功');
                                this.$emit('modal-close', true);
                                this.getList();
                                this.addForm = {};
                                this.img_url = [];
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        });
                        this.showModal = false;
                    }
                });


            },
            // 图片上传及插入
            handleSuccess(res, file) {
                let obj = {};
                obj[res.data.imageUrl] = res.data.filename;
                this.img_url.push(obj);
                // 获取富文本组件实例
                var vm = this;
                let quill = this.$refs.myQuillEditor.quill;
                //    光标位置
                // console.log('res---', vm.$refs.myQuillEditor.quill.getSelection())
                if (res.code === 200) {
                    this.addForm.accessorys = res.data.imageUrl;
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片
                    quill.insertEmbed(length, 'image', res.data.imageUrl);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    vm.$Message.error('图片插入失败');
                }
            },
            handleFormatError() {
                this.$Message.error('文件类型错误，请上传类型是jpg、jpeg、png的文件!');
            },
            exceededSize() {
                this.$Message.error('上传文件过大，请重新上传!');
            },

            // 批量删除
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的资讯');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除资讯？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.healthyinfo_delete,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除资讯成功');
                                    self.getList();
                                } else {
                                    self.$Message.error('删除资讯失败');
                                }
                            });
                    },
                    cancel: function () {
                        self.getList();
                    }
                });
            },
            // 关键字搜索
            Search() {
                this.pageConfig.page = 1;
                this.getList();
            },
            // 表格多选
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            // 资讯列表
            getList() {
                this.selectionValue = [];
                this.$ajax({
                    url: urls.healthyinfo_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        name: this.searchList.keyword,
                        publishdate: new Date(this.searchList.send_date).getTime()
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    });
            },
            // 分页获取列表
            pageChange(page) {
                this.pageConfig.page = page;
                this.getList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
        },
        watch: {//处理表单验证提示信息
            showModal(newValue) {
                if (!newValue) {
                    this.$refs['addForm'].resetFields();
                    this.addForm = {};
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            }
        },

        mounted() {
            this.getList();
            addQuillTitle();
        },
    };
</script>
<style lang="scss">
    .functionalAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }

        .ivu-modal-body {
            .leftFormItem {
                // width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }

            .rightFormItem {
                width: 266px;

                .ivu-input {
                    width: 200px;
                }
            }

            .detail {
                width: 100%;
                padding: 10px 41px 0px 10px;
                box-sizing: border-box;
                border: 1px solid #DDE5E7;
                border-radius: 6px;
                background-color: #DDE5E7;
                max-height: 360px;
                overflow-y: auto;
                overflow-x: hidden;

                img {
                    max-width: 100%
                }
            }
        }

        .ivu-modal-footer {
            display: none;
        }
    }

    // .myStyle {
    //     .functionalAddModal .ivu-modal-body .leftFormItem {
    //         // width: 100%!important;

    //     }
    // }

    .blankBox-gt {
        padding: 0 0 30px 0;
    }

    .quill-editor {
        border: 1px solid #DDE5E7;
        border-radius: 4px;

        // .ql-toolbar.ql-snow {
        //     // padding: 0px!important;
        // }

        .ql-editor {
            max-height: 360px !important;


            // img {
            // }
        }
    }

    // .ivu-upload {
    //     // height: 1px;
    //     .ivu-upload-select {
    //     }
    // }

    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip:before {
        content: "链接地址:";
    }

    .ql-snow .ql-tooltip a.ql-action:after {
        content: "编辑";
    }

    .ql-snow .ql-tooltip a.ql-remove:before {
        content: "撤销";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-color-picker, .ql-snow .ql-icon-picker {
        width: 28px;
        margin-bottom: 4px;
    }

    .ql-snow .ql-picker.ql-size {
        width: 64px;
        border: 1px solid #eee;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
        vertical-align: middle;
        margin-bottom: 14px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-header {
        width: 76px;
        border: 1px solid #eee;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '段落';
        vertical-align: middle;
        margin-bottom: 14px;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font {
        width: 92px;
        border: 1px solid #eee;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
        vertical-align: middle;
        margin-bottom: 14px;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
        content: '衬线字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
        content: '等宽字体';
    }

</style>

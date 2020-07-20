/* eslint-disable no-undef */
const menu = {
    system: [
        {
            'title': '系统管理',
            'name': 'system',
            'children': [
                {
                    'title': '用户管理',
                    'icon': require('../assets/menu/user.png'),
                    'name': 'user'
                },
                {
                    'title': '角色管理',
                    'icon': require('../assets/menu/role.png'),
                    'name': 'role'
                },
                // {
                //     'title': '功能管理',
                //     'icon': require('../assets/menu/functional.png'),
                //     'name': 'functional',
                // },
                {
                    'title': '字典类别管理',
                    'icon': require('../assets/menu/dictionaryType.png'),
                    'name': 'dictionaryType'
                },
                {
                    'title': '字典信息管理',
                    // 'icon': 'iconfont iconzidianxinxiguanli',
                    'icon': require('../assets/menu/dictionaryInfo.png'),
                    'name': 'dictionaryInfo'
                },
                {
                    'title': '通知管理',
                    'icon': require('../assets/menu/noticeManage.png'),
                    'name': 'noticeManage'
                },
                {
                    'title': '通知',
                    'icon': require('../assets/menu/notice.png'),
                    'name': 'notice'
                },
                {
                    'title': '小程序用户管理',
                    'icon': require('../assets/menu/applet-default.png'),
                    'name': 'applet'
                },
                {
                    'title': '健康资讯维护',
                    'icon': require('../assets/menu/healthResource.png'),
                    'name': 'healthResource'
                }
            ]
        }
    ],
    dataCenter: [
        {
            'title': '数据中心',
            'name': 'dataCenter',
            'children': [
                {
                    'title': '基础构建服务',
                    'icon': require('../assets/menu/basicFoundation.png'),
                    'name': 'basicFoundation',
                    'children': [
                        {
                            'title': '系统日志',
                            'name': 'systemDialog'
                        }
                        // {
                        //     'title': '标准化导出',
                        //     'name': 'standardizedOut'
                        // },
                        // {
                        //     'title': '标准化导入',
                        //     'name': 'standardizedImport'
                        // }
                    ]
                },

                {
                    'title': '基础数据信息',
                    'icon': require('../assets/menu/basicData.png'),
                    'name': 'basicData',
                    children: [
                        {
                            'title': '教育体系信息管理',
                            'name': 'education'
                        },
                        {
                            'title': '疾控中心信息管理',
                            'name': 'diseaseControl'
                        },
                        {
                            'title': '体质监测人员管理',
                            'name': 'fitMonitor'
                        },
                        {
                            'title': '医疗机构信息管理',
                            'name': 'unit'
                        },
                        // {
                        //     'title': '科室信息管理',
                        //     'name': 'sectionInfo'
                        // },
                        {
                            'title': '医生信息管理',
                            'name': 'doctorInfo'
                        },
                        {
                            'title': '学校信息管理',
                            'name': 'schoolInfo'
                        },
                        {
                            'title': '校医信息管理',
                            'name': 'schDocInfo'
                        },
                        {
                            'title': '老师信息管理',
                            'name': 'teacherInfo'
                        },
                        {
                            'title': '班级信息管理',
                            'name': 'classInfo'
                        },
                        {
                            'title': '学生信息管理',
                            'name': 'studentInfo'
                        }
                    ]
                },
                {
                    'title': '基础配置',
                    'icon': require('../assets/menu/basicFoundation.png'),
                    'name': 'DataConfig',
                    children: [
                        {
                            'title': '体检项目参数配置',
                            'name': 'examinationItemConf'
                        },
                        {
                            'title': '体测项目参数配置',
                            'name': 'physicalParaConfig'
                        },
                        {
                            'title': '学生检测名单',
                            'name': 'proofreading'
                        },
                        {
                            'title': '临时名单入口',
                            'name': 'tempList'
                        },
                        {
                            'title': '体检二维码生成',
                            'name': 'printQRcode'
                        },
                        {
                            'title': '学校班级人数审核',
                            'name': 'review'
                        }
                    ]
                }
            ]
        }
    ],
    medicalExamination: [
        {
            'title': '统一体检',
            'name': 'medicalExamination',
            'children': [
                {
                    'title': '体检准备',
                    'icon': require('../assets/menu/prepare.png'),
                    'name': 'prepare',
                    'children': [
                        {
                            'title': '体检项目规划',
                            'name': 'examinationPlan'
                        },
                        {
                            'title': '设定体检计划',
                            'name': 'examinationTeamConfig'
                        },
                        {
                            'title': '体检排程',
                            'name': 'schedule'
                        },

                    ]
                },
                {
                    'title': '体检执行',
                    'icon': require('../assets/menu/action.png'),
                    'name': 'examinationAction',
                    'children': [
                        {
                            'title': '既往结核病史和接触史名单',
                            'name': 'tubAndComList',
                        },
                        {
                            'title': '体检情况显示',
                            'name': 'condition'
                        }
                    ]
                },
                {
                    'title': '体检报告',
                    'icon': require('../assets/menu/medicalReport.png'),
                    'name': 'medicalReport',
                    'children': [
                        {
                            'title': '县市学校体检数据批量导入',
                            'name': 'schoolImport'
                        },
                        {
                            'title': '体检数据批量导出',
                            'name': 'examImport'
                        },
                        {
                            'title': '小程序结果通知',
                            'name': 'examResult'
                        },
                        {
                            'title': '电子体检报告',
                            'name': 'personSummaryReport'
                        },
                        {
                            'title': '告家长书',
                            'name': 'notifyParents'
                        }
                    ]
                },
                {
                    'title': '体检复查反馈',
                    'icon': require('../assets/menu/reTest.png'),
                    'name': 'reTests',
                    children: [
                        {
                            'title': '校医核实',
                            'name': 'reTest'
                        },
                        {
                            'title': '家长反馈',
                            'name': 'parentFeedback'
                        },
                        {
                            'title': '校医追踪复测',
                            'name': 'followed'
                        }
                    ]
                },
                {
                    'title': '统计汇总',
                    'icon': require('../assets/menu/statistics.png'),
                    'name': 'statistics',
                    children: [
                        {
                            'title': '体检报告单汇总',
                            'name': 'summaryReport'
                        },
                        {
                            'title': '新生入学结核病检查汇总表',
                            'name': 'tubeCheck'
                        }
                    ]
                },
                {
                    'title': '数据上报',
                    'icon': require('../assets/menu/dataReport.png'),
                    'name': 'dataReport',
                    children: [
                        {
                            'title': '上报体检数据模板设定',
                            'name': 'templetSet'
                        }
                    ]
                }
            ]
        }
    ],
    physicalFitnessTest: [
        {
            'title': '健康体测',
            'name': 'physicalFitnessTest',
            'children': [
                {
                    'title': '体测准备',
                    'icon': require('../assets/menu/physicalPrepare.png'),
                    'name': 'physicalPrepare',
                    'children': [
                        {
                            'title': '体测项目规划',
                            'name': 'projectPlanNew'
                        }
                        // ,{
                        //     'title': '体测计划规划（手动）',
                        //     'name': 'physicalTestPlan',
                        //     'children': [
                        //         {
                        //             'title': '设定体测对象',
                        //             'name': 'physicaltestobject'
                        //         },
                        //         {
                        //             'title': '体测排程',
                        //             'name': 'physicalschedule'
                        //         },
                        //         {
                        //             'title': '审核',
                        //             'name': 'physicalaudit'
                        //         }
                        //     ]
                        // }
                    ]
                },
                {
                    'title': '体测执行',
                    'icon': require('../assets/menu/action.png'),
                    'name': 'physicalAction',
                    'children': [
                        {
                            'title': '体能测试数据录入',
                            'name': 'physicalDataEntry',
                        }
                    ]
                },
                {
                    'title': '体测报告',
                    'icon': require('../assets/menu/physicalReport.png'),
                    'name': 'physicalReport',
                    'children': [
                        {
                            'title': '未测学生名单',
                            'name': 'noTestStudent'
                        },
                        {
                            'title': '县市学校体测数据批量导入',
                            'name': 'physicalData'
                        },
                        {
                            'title': '体能测试数据批量导出',
                            'name': 'resultSummarizing'
                        },
                        {
                            'title': '小程序结果通知',
                            'name': 'resultInform'
                        },
                        {
                            'title': '体能测试电子报告',
                            'name': 'elecPhysicalReport'
                        }
                    ]
                },
                {
                    'title': '统计汇总',
                    'icon': require('../assets/menu/statistics.png'),
                    'name': 'testReport',
                    'children': [
                        {
                            'title': '体能测试报告单汇总',
                            'name': 'fitData'
                        }
                        // ,{
                        //     'title': '区域汇总报告单',
                        //     'name': 'areaPhysicalReport'
                        // },
                        // {
                        //     'title': '学校汇总报告单',
                        //     'name': 'schoolPhysicalReport'
                        // },
                        // {
                        //     'title': '年级汇总报告单',
                        //     'name': 'gradePhysicalReport'
                        // },
                        // {
                        //     'title': '班级汇总报告单',
                        //     'name': 'classPhysicalReport'
                        // },
                        // {
                        //     'title': '年龄汇总报告单',
                        //     'name': 'agePhysicalReport'
                        // },
                        // {
                        //     'title': '性别汇总报告单',
                        //     'name': 'genderPhysicalReport'
                        // },
                        // {
                        //     'title': '体测项目报告单',
                        //     'name': 'allPhysicalReport'
                        // }
                    ]
                },
                {
                    'title': '数据上报',
                    'icon': require('../assets/menu/dataReport.png'),
                    'name': 'fitDataReport',
                    'children': [
                        {
                            'title': '上报体测数据模版设定',
                            'name': 'fitDataTempale'
                        }]
                }
            ]
        }
    ],
    monitor: [
        {
            'title': '体质监测',
            'name': 'monitor',
            'children': [
                {
                    'title': '监测准备',
                    'icon': require('../assets/menu/physicalPrepare.png'),
                    'name': 'monitorprepare',
                    'children': [
                        {
                            'title': '体质监测名单',
                            'name': 'monitorStudentsList'
                        },
                        {
                            'title': '监测项目规划',
                            'name': 'monitorProjectPlan'
                        },
                        {
                            'title': '监测队伍配置',
                            'name': 'monitorTeamConfig'
                        },
                        {
                            'title': '监测计划规划（手动）',
                            'name': 'monitorPlan',
                            'children': [
                                {
                                    'title': '设定监测计划',
                                    'name': 'setMonitorObj'
                                },
                                {
                                    'title': '监测排程',
                                    'name': 'monitorTime'
                                }
                                // ,{
                                //     'title': '审核',
                                //     'name': 'auditing'
                                // }
                            ]
                        },
                        {
                            'title': '体质抽查',
                            'name': 'physicalExamination'
                        }
                        // ,{
                        //     'title': '监测计划规划（自动）',
                        //     'name': 'monitorPlanAuto',
                        //     'children': []
                        // },
                    ]
                },
                {
                    title: '体质监测报告',
                    name: 'monitorReport',
                    icon: require('../assets/menu/monitorReport.png'),
                    children: [
                        {
                            title: '县市学校体质监测数据批量导入',
                            name: 'cityDataReport'
                        },
                        {
                            title: '体质监测数据批量导出',
                            name: 'monitorDataExport'
                        },
                        {
                            title: '小程序结果通知',
                            name: 'monitorResult'
                        },
                        {
                            title: '体质监测电子报告',
                            name: 'monitorElectronic'
                        }
                    ]
                },
                {
                    title: '统计汇总',
                    name: 'statisSummary',
                    icon: require('../assets/menu/monitorStatisSummary.png'),
                    children: [
                        {
                            title: '体质监测报告单汇总',
                            name: 'monitorStatisSummary'
                        }
                    ]
                },
                {
                    title: '数据上报',
                    name: 'dataUpload',
                    icon: require('../assets/menu/monitorDataUpload.png'),
                    children: [
                        {
                            title: '体质监测数据上报',
                            name: 'monitorDataUpload'
                        }
                    ]
                }
            ]
        }
    ]
};
export default menu;

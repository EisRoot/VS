import time
import datetime
import json
import sys
import pandas as pd
from sklearn.preprocessing import StandardScaler #引入去均值和方差归一化
import numpy as np
from sklearn.linear_model import Lasso,Ridge  #引入Lasso线性回归
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV  #专门用来交叉验证的
from sklearn.externals import joblib #保存训练好的模型

#训练并且预测
def trainAndPredict(df_train,name):
    df = df_train
    df_train = df_train.drop('uid',axis = 1) #删除学生id这一列
    df_X = df_train.drop('grades',axis=1)
    df_X = StandardScaler().fit_transform(df_X)
    df_y = df_train['grades']

    # Lasso线性回归预测
    # x_train, x_test, y_train, y_test = train_test_split(df_X, df_y, random_state=1) #划分训练集和测试集
    
    model = Ridge() #lamba1正则
    alpha_can = np.logspace(-3, 2, 5)
    ridge_model = GridSearchCV(model, param_grid={'alpha': alpha_can}, cv=5)
    ridge_model.fit(df_X, df_y)

    #利用训练好的模型，预测测试集，结果放入y_hat
    # t_x = np.arange(len(df_X)) #测试数据
    y_hat = ridge_model.predict(np.array(df_X))


    #计算预测的准确率
    #保存模型
    saveModel(ridge_model,name) #6个特征均用
    predict_grades_df = pd.DataFrame(y_hat,columns=['grades'])
    predict_grades_df = pd.concat([df['uid'],predict_grades_df],axis=1)
    preduct_grades_df_trans = predict_grades_df
    for i in range((len(predict_grades_df['uid']))):
        preduct_grades_df_trans['uid'][i] = predict_grades_df['uid'][i].strip('u')
    b = list(zip(map(int, list(preduct_grades_df_trans['uid'])), list(preduct_grades_df_trans['grades'])))
    return b

#保存机器学习模型
def saveModel(model,name):
    #6个特征转2进制
    joblib.dump(model, "C:\\Users\lab\WebstormProjects\VS\public\Python\\train_model"+ str(int(name,2)) + ".m")

#利用训练好模型进行预测
def useModel(df_train,name):
    ridge_model = joblib.load("C:\\Users\lab\WebstormProjects\VS\public\Python\\train_model" + str(int(name,2)) + ".m")
    return ridge_model


def filter(df_train,name):
    df = df_train
    feature = int(name,2)
    # print(feature)
    # print(feature&32)
    # print(feature&16)
    # print(feature&8)
    # print(feature&4)
    # print(feature&2)
    # print(feature&1)        
    if feature&64 == 0 :
        df = df.drop('attendance_rate',axis=1)
    if feature&32 == 0 :
        df = df.drop('views',axis=1)
    if feature&16 == 0 :
        df = df.drop('questions',axis=1)
    if feature&8 == 0 :
        df = df.drop('notes',axis=1)
    if feature&4 == 0 :
        df = df.drop('answers',axis=1)
    if feature&2 == 0 :
        df = df.drop('sleep',axis=1)
    if feature&1 == 0 :
        df = df.drop('conv', axis=1)
    # print("过滤掉的维度:",df.shape)
    # print(df)
    return df

#根据特征进行训练
def train(feature_name):
    df_train = pd.read_csv("C:\\Users\lab\WebstormProjects\VS\public\Python\\train.csv", encoding="utf-8")
    #带参数启动python
    ##  1 得到前端传来的特征表示字符串
    
    ##  2 根据字符串得到要筛选训练的特征组成训练dataframe
    #按位操作，得到1或0，根据1或0选择是否drop掉对应特征
    df = filter(df_train,feature_name)
    # print("训练维度",df.shape)
    ##  3 根据dataframe训练并进行预测
    result = trainAndPredict(df,feature_name)
    ##  4 得到预测结果返回为json
    #result 转json
    jsonArr = json.dumps(result,ensure_ascii=False)
    print(jsonArr)

def adjustid(id):
    id=int(id)
    if id > 9 :
        return 'u'+str(id)
    else:
        return 'u0'+str(id)

#根据传来的id修改预测值
def modify(feature_name,feature_array,modify_id):
    df_train = pd.read_csv("C:\\Users\lab\WebstormProjects\VS\public\Python\\train.csv", encoding="utf-8")
    model = useModel(df_train,feature_name)
    adjustId = adjustid(modify_id)
    # df_train.loc[df_train['uid'] == adjustId, 'sleep'] *= 0.5
    # print(df_train.loc[df_train['uid'] == adjustId, 'sleep'])
    # print("修改前:")
    # print(df_train.loc[df_train['uid'] == adjustId])
    #根据特征修改信息
    sum = 0
    feature = int(feature_name,2)
    #取feature_array第几个数作为修改倍数
    test_stu = df_train[df_train['uid'] == adjustId]
    if feature&64 == 64 :
        test_stu['attendance_rate'] *= feature_array[sum]
        #得到要修改学生的id和要改的属性，以及要改的值，执行修改操作
        sum += 1
    else :
        test_stu = test_stu.drop('attendance_rate',axis = 1)
    if feature&32 == 32 :
        test_stu['views'] *= feature_array[sum]
        sum += 1
    else:
        test_stu = test_stu.drop('views',axis = 1)
    if feature&16 == 16 :
        test_stu['questions'] *= feature_array[sum]
        sum += 1
    else:
        test_stu = test_stu.drop('questions',axis = 1)
    if feature&8 == 8 :
        test_stu['notes'] *= feature_array[sum]
        sum += 1
    else:
        test_stu = test_stu.drop('notes',axis = 1)
    if feature&4 == 4 :
        test_stu['answers'] *= feature_array[sum]
        sum += 1
    else:
        test_stu = test_stu.drop('answers',axis = 1)
    if feature&2 == 2 :
        test_stu['sleep'] *= feature_array[sum]
    else:
        test_stu = test_stu.drop('sleep',axis = 1)
    if feature&1 == 1 :
        test_stu['conv'] *= feature_array[sum]
    else:
        test_stu = test_stu.drop('conv',axis = 1)
    #修改好的值
    # print("修改后:")
    # print(test_stu)
    test_stu = test_stu.drop('uid',axis = 1).drop('grades',axis=1)
    # print(test_stu.shape)
    print(test_stu)
    test_stu = StandardScaler().fit_transform(test_stu)
    print(test_stu)

    result2 = model.predict(np.array(test_stu))

    # #新的预测数据
    print(result2)
    # return result

if __name__ == '__main__':
    # feature_name = "1011001" #需要训练的特征
    feature_name = sys.argv[1]
    if len(sys.argv) < 3 :
        train(feature_name)
    else:
        feature_array = sys.argv[2] #得到修改的特征集
        # print(feature_array)
        feature_array=feature_array.split(',')
        feature_array_f=[]
        for sttr in feature_array:
            feature_array_f.append(float(sttr)/100)

        modify_id = sys.argv[3] #需要修改的学生id
        # print (feature_array_f)
        # print (modify_id)

        modify(feature_name,feature_array_f,modify_id)



    

    # train(feature_name)

    # feature_array = [0.7,1.2,0.8,1]
    # modify_id = 8
    # modify(feature_name,feature_array,modify_id)

    # if len(sys.argv) < 2:
    #     train() 
    # else:
    #     modify(feature_array,modify_id,feature_name)
    #     print("预测数据")
    
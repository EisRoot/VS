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
    x_train, x_test, y_train, y_test = train_test_split(df_X, df_y, random_state=1) #划分训练集和测试集
    
    model = Ridge() #lamba1正则
    alpha_can = np.logspace(-3, 2, 10)
    ridge_model = GridSearchCV(model, param_grid={'alpha': alpha_can}, cv=2)
    ridge_model.fit(df_X, df_y)

    #利用训练好的模型，预测测试集，结果放入y_hat
    t_x = np.arange(len(df_X)) #测试数据
    y_hat = ridge_model.predict(np.array(df_X))


    #计算预测的准确率
    #保存模型
    saveModel(ridge_model,name) #6个特征均用
    predict_grades_df = pd.DataFrame(y_hat,columns=['grades'])
    predict_grades_df = pd.concat([df['uid'],predict_grades_df],axis=1)
    for i in range((len(predict_grades_df['uid']))):
        predict_grades_df['uid'][i] = predict_grades_df['uid'][i].strip('u')
    b = list(zip(map(int, list(predict_grades_df['uid'])), list(predict_grades_df['grades'])))
    return b

#保存机器学习模型
def saveModel(model,name):
    #6个特征转2进制
    joblib.dump(model,"train_model"+str(int(name,2))+".m")
    print(str(int(name,2)))

def filter(df_train,name):
    df = df_train
    feature = int(name)
    if feature&1 == 0 :
        df.drop('sleep',axis=1)
    if feature&2 == 0 :
        df.drop('answers',axis=1)
    if feature&4 == 0 :
        df.drop('notes',axis=1)
    if feature&8 == 0 :
        df.drop('questions',axis=1)
    if feature&16 == 0 :
        df.drop('views',axis=1)
    if feature&32 == 0 :
        df.drop('attendance_rate',axis=1)
    return df

def test():
    df_train = pd.read_csv("C:\\Users\\lab\\WebstormProjects\\VS\\public\\Python\\train.csv", encoding="utf-8")
    #带参数启动python
    ##  1 得到前端传来的特征表示字符串
    feature_name = sys.argv[1] #需要动态改
    ##  2 根据字符串得到要筛选训练的特征组成训练dataframe
    #按位操作，得到1或0，根据1或0选择是否drop掉对应特征
    filter(df_train,feature_name)
    ##  3 根据dataframe训练并进行预测
    result = trainAndPredict(df_train,feature_name)
    ##  4 得到预测结果返回为json
    #result 转json
    jsonArr = json.dumps(result,ensure_ascii=False)
    print(jsonArr)

if __name__ == '__main__':

    test()
    # trainAndPredict(df_train)   #训练模型并预测
    # 利用保存的模型预测
    # modelname = "63" #6个特征均用
    # useModel(df_train, modelname) 
    # d_index = list(df_train.columns).index('views')
    # #得到要修改学生的id和要改的属性，以及要改的值，执行修改操作
    # df_train.iloc[2,d_index] = 0
    # print(df_train)
    # #修改后
    # trainAndPredict(df_train)


# def useModel(df_train,name):
#     ridge_model = joblib.load("train_model" + name + ".m")
#     #预测
#     #利用训练好的模型，预测测试集，结果放入y_hat
#     df = df_train
#     df_train = df_train.drop('uid',axis = 1) #删除学生id这一列
#     # df_zero = df_train[df_train['grades'].isin([0])]
#     df_X = df_train.drop('grades',axis=1)
#     df_X = StandardScaler().fit_transform(df_X)
#     df_y = df_train['grades']

#     # Lasso线性回归预测
#     x_train, x_test, y_train, y_test = train_test_split(df_X, df_y, random_state=1) #划分训练集和测试集

#     y_hat = ridge_model.predict(np.array(x_test))
#     mse = np.average((y_hat - np.array(y_test)) ** 2)  #计算均方误差
#     rmse = np.sqrt(mse)  # 均方误差开根号
#     #加入领回归以后，误差值更小了
#     print(mse, rmse)

#     print(len(df_X))
#     t_x = np.arange(len(df_X)) #测试数据
#     y_hat = ridge_model.predict(np.array(df_X))
#     plt.plot(t_x, df_y, 'r-', marker='+',linewidth=2, label='Test')
#     plt.plot(t_x, y_hat, 'g-', marker='*',linewidth=2, label='Predict')
#     plt.legend(loc='upper right')
#     plt.grid()
#     plt.show()
#     predict_grades_df = pd.DataFrame(y_hat,columns=['grades'])
#     predict_grades_df = pd.concat([df['uid'],predict_grades_df],axis=1)
#     for i in range((len(predict_grades_df['uid']))):
#         predict_grades_df['uid'][i] = predict_grades_df['uid'][i].strip('u')
#     b = list(zip(map(int, list(predict_grades_df['uid'])), list(predict_grades_df['grades'])))
#     return b
%function LoadFiles
% �����ļ���
%pathName = uigetdir(cd, '��ѡ���ļ���');
% if pathName == 0
%     msgbox('��û����ȷѡ���ļ���');
%     return;
% end
function [fileNum filePathArray fileNameArray] =LoadFiles(pathName,filetype)
%pathName = 'G:\��ɫ������Գ���\matlab\';
% ����bmp��ʽ�ļ�
fileNameArray = ls(strcat(pathName,'\*.',filetype));
filePathArray = strcat(pathName,fileNameArray); % �õ��ļ�·��
%filePathSet=cell2mat(filePathSet);
%fileNum = length(size(filePathArray)); % �ļ�����
fileNum = size(filePathArray,1); % �ļ�����
clc;
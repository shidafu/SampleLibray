function varargout = SampleTool(varargin)
% SAMPLETOOL MATLAB code for SampleTool.fig
%      SAMPLETOOL, by itself, creates a new SAMPLETOOL or raises the existing
%      singleton*.
%
%      H = SAMPLETOOL returns the handle to a new SAMPLETOOL or the handle to
%      the existing singleton*.
%
%      SAMPLETOOL('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in SAMPLETOOL.M with the given input arguments.
%
%      SAMPLETOOL('Property','Value',...) creates a new SAMPLETOOL or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before SampleTool_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to SampleTool_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help SampleTool

% Last Modified by GUIDE v2.5 03-Aug-2016 16:07:23

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @SampleTool_OpeningFcn, ...
                   'gui_OutputFcn',  @SampleTool_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
% End initialization code - DO NOT EDIT


% --- Executes just before SampleTool is made visible.
function SampleTool_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to SampleTool (see VARARGIN)

% Choose default command line output for SampleTool
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% UIWAIT makes SampleTool wait for user response (see UIRESUME)
% uiwait(handles.SampleTool);


% --- Outputs from this function are returned to the command line.
function varargout = SampleTool_OutputFcn(hObject, eventdata, handles) 
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;



% --- Executes on button press in fileBtn.
function fileBtn_Callback(hObject, eventdata, handles)
% hObject    handle to fileBtn (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


% --- Executes on button press in sampleBtn.
function sampleBtn_Callback(hObject, eventdata, handles)
% hObject    handle to sampleBtn (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


% --- Executes on selection change in fileLst.
function fileLst_Callback(hObject, eventdata, handles)
% hObject    handle to fileLst (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: contents = cellstr(get(hObject,'String')) returns fileLst contents as cell array
%        contents{get(hObject,'Value')} returns selected item from fileLst



% --- Executes on selection change in classPop.
function classPop_Callback(hObject, eventdata, handles)
% hObject    handle to classPop (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: contents = cellstr(get(hObject,'String')) returns classPop contents as cell array
%        contents{get(hObject,'Value')} returns selected item from classPop


% --- Executes on selection change in sampleLst.
function sampleLst_Callback(hObject, eventdata, handles)
% hObject    handle to sampleLst (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: contents = cellstr(get(hObject,'String')) returns sampleLst contents as cell array
%        contents{get(hObject,'Value')} returns selected item from sampleLst



% --- Executes on button press in newClassBtn.
function newClassBtn_Callback(hObject, eventdata, handles)
% hObject    handle to newClassBtn (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


% --- Executes on button press in addSampleBtn.
function addSampleBtn_Callback(hObject, eventdata, handles)
% hObject    handle to addSampleBtn (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


function widthEdt_Callback(hObject, eventdata, handles)
% hObject    handle to widthEdt (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of widthEdt as text
%        str2double(get(hObject,'String')) returns contents of widthEdt as a double


function heightEdt_Callback(hObject, eventdata, handles)
% hObject    handle to heightEdt (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of heightEdt as text
%        str2double(get(hObject,'String')) returns contents of heightEdt as a double


function leftEdt_Callback(hObject, eventdata, handles)
% hObject    handle to leftEdt (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of leftEdt as text
%        str2double(get(hObject,'String')) returns contents of leftEdt as a double


function topEdt_Callback(hObject, eventdata, handles)
% hObject    handle to topEdt (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of topEdt as text
%        str2double(get(hObject,'String')) returns contents of topEdt as a double
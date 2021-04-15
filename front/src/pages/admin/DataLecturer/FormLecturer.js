import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Space, Row, Button} from 'antd';
import { ErrorMessage } from "@hookform/error-message";
import Autocomplete from 'react-autocomplete';

const FormLecturer = ({handleOk, handleCancel, itemEdit, dataLecturer}) => {
  function unique(text) {
    var newArr = dataLecturer.map(item => item[text])
    const arrNew = Array.from(new Set(newArr))
    const newA = []
    for (let i = 0; i < arrNew.length; i++) {
      newA.push({title: arrNew[i]})
    }
    return newA
  }
  const arrDepartments = unique("department")
  const arrSubjects = unique("subject")

  let defaultValues = {
    name: itemEdit?.name,
    email: itemEdit?.email,
    programs: itemEdit?.programs,
  };
  const { handleSubmit, register, errors } = useForm({ defaultValues });
  const [department, setDepartment] = useState(itemEdit?.department);
  const [subject, setSubject] = useState(itemEdit?.subject);

  const renderMovieTitle = (arrDepartments, department) => {
    return (
      arrDepartments?.title?.toLowerCase().indexOf(department?.toLowerCase()) !== -1
    );
  }

  const renderMovieTitle1 = (arrSubjects, subject) => {
    return (
      arrSubjects?.title?.toLowerCase().indexOf(subject?.toLowerCase()) !== -1
    );
  }

  return (
  <div className="form-login addLecturer" style={{padding: "0px"}}>
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="form-login__content">

        <div className="form-login__form login d-flex flex-column justify-content-center mb-2">
          <form className="login-form" onSubmit={handleSubmit(data => handleOk({...data, department: department, subject: subject}, itemEdit?.id))}>
            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Tên giảng viên:</label>
              </div> 
              <input
                name="name"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="name" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Email:</label>
              </div> 
              <input
                name="email"
                className="form-input"
                ref={register({ required: "This is required message" })}
              />
              <ErrorMessage errors={errors} name="email" as="p" className="form_email-validate"/>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Khoa:</label>
              </div> 
              <div className="autocomplete-wrapper">
                <Autocomplete
                  value={department}
                  items={arrDepartments}
                  getItemValue={item => item.title}
                  shouldItemRender={renderMovieTitle}
                  renderMenu={item => (
                    <div className="dropdown">
                      {item}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) =>
                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                      {item.title}
                    </div>
                  }
                  onChange={(event) => setDepartment(event.target.value)}
                  onSelect={department => setDepartment(department)}
                />
              </div>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Bộ môn:</label>
              </div> 
              <div className="autocomplete-wrapper">
                <Autocomplete
                  value={subject}
                  items={arrSubjects}
                  getItemValue={item => item.title}
                  shouldItemRender={renderMovieTitle1}
                  renderMenu={item => (
                    <div className="dropdown">
                      {item}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) =>
                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                      {item.title}
                    </div>
                  }
                  onChange={(event) => setSubject(event.target.value)}
                  onSelect={subject => setSubject(subject)}
                />
              </div>
            </div>

            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Chức vụ:</label>
              </div> 
              <input
                name="position"
                className="form-input"
                ref={register()}
              />
            </div>
  
            <div className="form-login__form-group">
              <div className="d-flex justify-content-between">
                <label className="form-label">Chương trình:</label>
                <select name="programs" className="programs" ref={register()}>
                <option value={1}>Đại học</option>
                <option value={0}>Sau đại học</option>
              </select>
              </div> 
            </div>

            <br/>
            <div className="d-flex justify-content-between">
                <Button type="primary" htmlType="submit">Save</Button>
              <Button onClick={() => handleCancel()}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>  
    </div>

  </div>
</div>
  );
};

export default FormLecturer;
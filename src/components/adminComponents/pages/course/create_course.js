import React, { Component } from "react";
import { Route, Switch ,Link } from "react-router-dom";
import { posturl } from "../../../../configuration.js";
import CKEditor from "ckeditor4-react";
import $ from "jquery";
import Swal from "sweetalert2";
import "../../../../innerAssets/backend/plugins/fileuploads/js/dropify.min.js"
import "../../../../innerAssets/backend/plugins/fileuploads/css/dropify.css"
import HeaderTop from "../../adminHeader/headerTop.js";

export class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      chlidCategories: [],
      courseTitle: "",
      shortDescription: "",
      longDescription: "",
      parentCategory: "",
	  childCategory: "",
	  courseImage : "",
	  courseVideo : "",
      level: "",
      coursePrice: "",
      metaKeywords: "",
      metaDescription: "",
      isTop: "",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.isChlid = this.isChlid.bind(this);
	this.onEditorChange = this.onEditorChange.bind(this);
	this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
	this.videoSelectedHandler = this.videoSelectedHandler.bind(this);
	this.isTopCourse = this.isTopCourse.bind(this);
  }

  fileSelectedHandler = e => {
	this.setState({ courseImage: [...this.state.courseImage, ...e.target.files] });
	console.log(e.target.files)
  };
  videoSelectedHandler = e => {
	this.setState({ courseVideo: [...this.state.courseVideo, ...e.target.files] });
	console.log(e.target.files)
  };

	onEditorChange(evt) {
		this.setState({
			longDescription: evt.editor.getData()
		});
	}
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  isTopCourse = e => {

	// this.setState({ [e.target.name]: e.target.value });
	if(this.state.isTop == true){
		this.setState({ [e.target.name]: false });
	}else{
		this.setState({ [e.target.name]: e.target.value });
	}
	console.log(this.state.isTop);
  };
  categoryHandleChange = e => {
	this.setState({ [e.target.name]: e.target.value });
	var words = this.state.categories;
	const result = words.filter(word=>word.categoryParent === e.target.value);
	this.setState({
		chlidCategories : result,
		childCategory : ""
	})
	$('.childCate').removeClass('hide');
	$('#select-child-cate').val("");
// console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
  };
  isChlid = e => {
    console.log(e.target.value);
    if (e.target.value == "Yes") {
      this.setState({ isChlid: true });
    } else {
      this.setState({ isChlid: false });
    }
  };
  handleCreateSubmit = e => {
	e.preventDefault();
    var courseTitle = this.state.courseTitle;
    var shortDescription = this.state.shortDescription;
    var longDescription = this.state.longDescription;
    var parentCategory = this.state.parentCategory;
    var childCategory = this.state.childCategory;
    var level = this.state.level;
    var coursePrice = this.state.coursePrice;
    var metaKeywords = this.state.metaKeywords;
	var metaDescription = this.state.metaDescription;
	var courseImage = this.state.courseImage;
	var courseVideo = this.state.courseVideo;
	var isTop = this.state.isTop;
	// console.log(isTop);
	// return false;
    if (courseTitle == "") {
		alert("Name required");
      return false;
    }
	$("#global-loader").addClass("preLoader");
	var formData = new FormData();
	
	formData.append("courseTitle", courseTitle);
	formData.append("shortDescription", shortDescription);
	formData.append("longDescription", longDescription);
	formData.append("parentCategory", parentCategory);
	formData.append("childCategory", childCategory);
	formData.append("level", level);
	formData.append("coursePrice", coursePrice);
	formData.append("metaKeywords", metaKeywords);
	formData.append("metaDescription", metaDescription);
	formData.append("courseImage", courseImage[0]);
	formData.append("courseVideo", courseVideo[0]);
	formData.append("isTop", isTop);
	console.log(formData);

    let insertUrl = posturl + "/lms_admin/admin/create_course";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
		cache: false,
        contentType: false,
        processData: false,
		data: formData
	}).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        if (result.create) {
		//   $("#createCategoryModal .close").click();
		$("#global-loader").removeClass("preLoader");
		$('#createCourse')[0].reset();
		Swal.fire({
            title: "Created",
            text: "Created updated successfully",
            timer: 2000,
            showConfirmButton: false
		  });	
		this.setState({
			shortDescription: "",
			longDescription: "",
			parentCategory: "",
			childCategory: "",
			courseImage : "",
			courseVideo : "",
			level: "",
			coursePrice: "",
			metaKeywords: "",
			metaDescription: "",
			isTop: ""
		})  
		  // this.getTableData();
        } else {
			$("#global-loader").removeClass("preLoader");
        }
      })
      .catch(err => {
		$("#global-loader").removeClass("preLoader");
        alert("error");
        console.log(err);
      });
  };

  
  getCategories() {
    this.$el = $(this.el);
    this.$el
      .DataTable()
      .destroy()
      .clear();
    let insertUrl = posturl + "/lms_admin/admin/get_categories";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST"
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        if (result) {
          this.setState({
            categories: result
          });
          this.$el.DataTable({
            searching: false
          });
        } else {
          this.setState({
            categories: []
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    console.log(posturl);
	this.getCategories();
	$('.dropify').dropify({
		messages: {
			'default': 'Drag and drop a file here or click',
			'replace': 'Drag and drop or click to replace',
			'remove': 'Remove',
			'error': 'Ooops, something wrong appended.'
		},
		error: {
			'fileSize': 'The file size is too big (2M max).'
		}
	});
  }
  render() {
    return (
      <React.Fragment>
        <div className="app-content ">
          <div className="side-app">
            <div className="main-content">
              <HeaderTop />
              <div className="container-fluid pt-8">
							<div className="page-header mt-0 shadow p-3">
								<ol className="breadcrumb mb-sm-0">
									<li className="breadcrumb-item active" aria-current="page">Create Course</li>
								</ol>
								<div className="btn-group mb-0">
									<Link
									type="button"
									to="/admin/courses"
									className="btn btn-primary btn-sm "
									>
									Courses
									</Link>
								</div>
							</div>
							<div className="row">
								
								<div className="col-xl-12">
									<div className="card m-b-20">
										{/* <div className="card-header">
											<h2 className="mb-0">Basic Wizard</h2>
										</div> */}
										<div className="card-body">
											<form id="createCourse">
												<div id="basicwizard" className="border pt-0">
													<ul className="nav nav-tabs nav-justified">
														<li className="nav-item"><a href="#tab1" data-toggle="tab" className="nav-link active show font-bold">Basic</a></li>
														<li className="nav-item"><a href="#tab2" data-toggle="tab" className="nav-link font-bold">Price</a></li>
														<li className="nav-item"><a href="#tab3" data-toggle="tab" className="nav-link font-bold">Media</a></li>
														<li className="nav-item"><a href="#tab4" data-toggle="tab" className="nav-link font-bold">Seo</a></li>
														
													</ul>
													<div className="tab-content card-body  b-0 mb-0">
														<div className="tab-pane fade active show" id="tab1">
															<div className="row">
																<div className="col-12">
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="courseTitle">Title</label>
																			</div>
																			<div className="col-lg-9">
																				<input className="form-control required" onChange={this.handleChange} id="courseTitle" name="courseTitle" type="text" />
																			</div>
																		</div>
																	</div>
																	<div className="form-group  clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label " for="shortDescription"> Short Description</label>
																			</div>
																			<div className="col-lg-9">
																				<input id="shortDescription" onChange={this.handleChange} name="shortDescription" type="text" className="required form-control" />
																			</div>
																		</div>
																	</div>
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="confirm">Description</label>
																			</div>
																			<div className="col-lg-9">
                                                                            <CKEditor
                                                                                data={this.state.data}
                                                                                onChange={this.onEditorChange}
                                                                            />
																			</div>
																		</div>
																	</div>
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="confirm">Parent Category</label>
																			</div>
																			<div className="col-lg-9">
																				<select name="parentCategory" onChange={this.categoryHandleChange} id="select-parent-cate" class="form-control custom-select">
                                                                                <option >Select Category</option>
                                                                                {this.state.categories.map((tit, index) =>
                                                                                    tit.categoryParent == 0 ?
																					<option key={index} value={tit.categoryId}>
                                                                                        {tit.categoryName}
                                                                                        </option>
																					
																					: null
                                                                                    )}
                                                                            </select>
																			</div>
																		</div>
																	</div>
																	<div className="form-group clearfix childCate hide">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="confirm">Child Category</label>
																			</div>
																			<div className="col-lg-9">
																				<select name="childCategory" onChange={this.handleChange} id="select-child-cate" class="form-control custom-select">
                                                                                <option >Select Category</option>
                                                                                {this.state.chlidCategories.map((tit, index) =>
                                                                                    <option key={index} value={tit.categoryId}>
                                                                                        {tit.categoryName}
                                                                                        </option>
                                                                                    )}
                                                                                </select>
																			</div>
																		</div>
																	</div>
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="confirm">Level</label>
																			</div>
																			<div className="col-lg-9">
                                                                            <select name="level" id="select-countries" onChange={this.handleChange} class="form-control custom-select">
                                                                                <option >Select Level</option>
                                                                                <option value="Beginner" >Beginner</option>
                                                                                <option value="Advanced" >Advanced</option>
                                                                                <option  value="Intermediate">Intermediate</option>
                                                                                </select>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="tab-pane fade" id="tab2">
															<div className="row">
																<div className="col-12">
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="coursePrice">Price</label>
																			</div>
																			<div className="col-lg-9">
																				<input id="coursePrice" name="coursePrice" onChange={this.handleChange} type="text" className="required form-control" />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="tab-pane fade" id="tab3">
															<div className="row">
															<div class="col-lg-6">
															<div class="card shadow">
																<div class="card-header">
																	<h2 class="mb-0">Image</h2>
																</div>
																<div class="card-body">
																	<input type="file" name="courseImage" accept="image/*" onChange={this.fileSelectedHandler} class="dropify" data-height="300" />
																</div>
															</div>
														</div>
															<div class="col-lg-6 hide">
																<div class="card shadow">
																	<div class="card-header">
																		<h2 class="mb-0">Demo Video</h2>
																	</div>
																	<div class="card-body">
																		<input type="file" name="courseVideo" onChange={this.videoSelectedHandler} class="dropify" accept="video/*"  data-height="300"  />
																	</div>
																</div>
															</div>
																{/* <div className="col-12">
																	<div className="form-group clearfix">
																		<div className="row">
																			<div className="col-lg-12">
																					<div class="card-body">
																						<input type="file" class="dropify" data-height="300" />
																					</div>
																			</div>		
																		</div>
																	</div>
																</div> */}
															</div>
														</div>
														<div className="tab-pane fade" id="tab4">
															<div className="row">
                                                            <div className="col-12">
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="coursePrice">Meta Keyword</label>
																			</div>
																			<div className="col-lg-9">
																				<input id="metaKeywords" name="metaKeywords" onChange={this.handleChange} type="text" className="required form-control" />
																			</div>
																		</div>
																	</div>
																</div>
                                                                <div className="col-12">
																	<div className="form-group clearfix">
																		<div className="row ">
																			<div className="col-lg-3">
																				<label className="control-label form-label" for="coursePrice">Meta Description</label>
																			</div>
																			<div className="col-lg-9">
																				<input id="metaDescription" name="metaDescription" onChange={this.handleChange} type="text" className="required form-control" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-12">
																	<div className="form-group clearfix">
																		<div className="checkbox checkbox-info">
																		
																			<label className="custom-control custom-checkbox">
																				<input type="checkbox" name="isTop" onChange={this.isTopCourse} defaultValue="true" className="custom-control-input" />
																				<span className="custom-control-label text-dark ml-2">Is Course Top</span>
																			</label>
																		</div>
																	</div>
																</div>
														<ul className="list-inline wizard mb-0">
															<li className="next list-inline-item float-right"><a type="button" onClick={this.handleCreateSubmit} className="btn btn-primary mb-0 waves-effect waves-light">Save</a></li>
														</ul>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
            </div>
          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default CreateCourse;

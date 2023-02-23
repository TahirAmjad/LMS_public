import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { posturl } from "../../../configuration.js";
import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../adminHeader/headerTop.js";
import "../../../innerAssets/backend/plugins/datatable/dataTables.bootstrap4.min.js";
// import "../../../innerAssets/backend/css/dashboard.css";
export class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryName: "",
      isChild: false,
      categoryParent: "",
      editCategoryName: "",
      editIsChild: false,
      editCategoryParent: "",
      categoryId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.isChildhandle = this.isChildhandle.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  isChildhandle = e => {
    console.log(e.target.value);
    if (e.target.value == "Yes") {
      this.setState({ isChild: true });
    } else {
      this.setState({ isChild: false });
    }
  };
  handleCreateSubmit = e => {
    e.preventDefault();
    var categoryName = this.state.categoryName;
    var categoryParent = this.state.categoryParent;
    var isChild = this.state.isChild;
    console.log(isChild);
    if (categoryName == "") {
      alert("Name required");
      return false;
    }
    if (isChild == true) {
      if (categoryParent == "") {
        alert("parent Category required");
        return false;
      }
    }
    // state assign

    let insertUrl = posturl + "/lms_admin/admin/create_category";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          categoryName: categoryName,
          categoryParent: categoryParent,
          isChild: isChild
        }
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
          this.setState({
            categoryName: "",
            categoryParent: "",
            isChild: false
          });
          $("#addNewClient")[0].reset();
          $("#createCategoryModal .close").click();
          this.getCategories();
        } else {
        }
      })
      .catch(err => {
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
  getCategory = categoryId => {
    let insertUrl = posturl + "/lms_admin/admin/get_category";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          categoryId: categoryId
        }
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
            editCategoryName: result.categoryName,
            editCategoryParent: result.categoryParent,
            categoryId: categoryId
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  deleteCategory = categoryId => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        alert("dfsd");
        let insertUrl = posturl + "/lms_admin/admin/delete_category";
        new Promise(function(resolve, reject) {
          $.ajax({
            url: insertUrl,
            dataType: "json",
            type: "POST",
            data: {
              categoryId: categoryId
            }
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
            if (result.delete) {
              Swal.fire("Done", result.message, "success");
              this.getCategories();
            } else {
            }
          })
          .catch(err => {
            alert("error");
            console.log(err);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
    // confirm();
    // alert("32");
    return false;
    let insertUrl = posturl + "/lms_admin/admin/get_category";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          categoryId: categoryId
        }
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
            editCategoryName: result.categoryName,
            editCategoryParent: result.categoryParent
            // editIsChild: false
          });
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  handleUpdateSubmit = e => {
    e.preventDefault();
    var categoryName = this.state.editCategoryName;
    var categoryParent = this.state.editCategoryParent;
    var categoryId = this.state.categoryId;
    if (categoryName == "") {
      alert("Name required");
      return false;
    }

    if (categoryParent == "") {
      alert("parent Category required");
      return false;
    }

    // state assign

    let insertUrl = posturl + "/lms_admin/admin/update_category";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          categoryName: categoryName,
          categoryParent: categoryParent,
          categoryId: categoryId
        }
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
        if (result.update) {
          this.setState({
            categoryName: "",
            categoryParent: "",
            categoryId: ""
          });
          $("#addNewClient")[0].reset();
          $("#updateCategoryModal .close").click();

          this.getCategories();
        } else {
        }
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
  componentDidMount() {
    console.log(posturl);
    this.getCategories();
  }

  render() {
    return (
      <React.Fragment>
        <div class="app-content ">
          <div class="side-app">
            <div class="main-content">
              <HeaderTop />
              <div class="container-fluid pt-8">
                <div class="page-header mt-0 shadow p-3">
                  <ol class="breadcrumb mb-sm-0">
                    <li class="breadcrumb-item active" aria-current="page">
                      Categories
                    </li>
                  </ol>
                  <div class="btn-group mb-0">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm "
                      data-toggle="modal"
                      data-target="#createCategoryModal"
                      aria-expanded="false"
                    >
                      Add New Category
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="card shadow">
                      {/* <div class="card-header">
                       <h2 class="mb-0">Data Table</h2>
                    </div> */}
                      <div class="card-body">
                        <div class="table-responsive">
                          <table
                            ref={el => (this.el = el)}
                            id="example"
                            class="table table-striped table-bordered w-100 text-nowrap"
                          >
                            <thead>
                              <tr>
                                <th class="wd-15p">Name</th>
                                <th class="wd-15p">Code</th>
                                <th class="wd-20p">parent</th>
                                <th class="wd-25p">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.categories.map((tit, index) => (
                                <tr key={index}>
                                  <td>{tit.categoryName}</td>
                                  <td>{tit.categoryCode}</td>
                                  <td>{tit.parentCategory}</td>
                                  <td>
                                    <div class="btn-group mb-0">
                                      <button
                                        type="button"
                                        class="btn btn-primary btn-sm dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Actions
                                      </button>
                                      <div class="dropdown-menu">
                                        <a
                                          class="dropdown-item"
                                          onClick={() =>
                                            this.deleteCategory(tit.categoryId)
                                          }
                                          href="#"
                                        >
                                          <i class="fas fa-trash mr-2"></i>
                                          Delete
                                        </a>
                                        <a
                                          class="dropdown-item"
                                          data-toggle="modal"
                                          data-target="#updateCategoryModal"
                                          aria-expanded="false"
                                          onClick={() =>
                                            this.getCategory(tit.categoryId)
                                          }
                                        >
                                          <i class="fas fa-edit mr-2"></i>Edit
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* add new cliend modal */}
        <div
          className="modal fade"
          id="createCategoryModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form
                method="post"
                id="addNewClient"
                onSubmit={this.handleCreateSubmit}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLabel">
                    Add New Category
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="categoryName"
                          onChange={this.handleChange}
                          placeholder="Category Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Is Child</label>
                        <select
                          id="select-countries"
                          class="form-control custom-select"
                          onChange={this.isChildhandle}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                    {this.state.isChild == true ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Parent Category</label>
                          <select
                            name="categoryParent"
                            id="select-countries"
                            class="form-control custom-select"
                            onChange={this.handleChange}
                          >
                            <option key="00" value="">
                              Select
                            </option>
                            {this.state.categories.map((tit, index) =>
                              tit.categoryParent == 0 ? (
                                <option key={index} value={tit.categoryId}>
                                  {tit.categoryName}
                                </option>
                              ) : null
                            )}
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end of add new cliend modal */}
        {/* edit  */}
        <div
          className="modal fade"
          id="updateCategoryModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form
                method="post"
                id="addNewClient"
                onSubmit={this.handleUpdateSubmit}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLabel">
                    Update Category
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="editCategoryName"
                          onChange={this.handleChange}
                          placeholder="Category Name"
                          value={this.state.editCategoryName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Is Child</label>
                        <select
                          id="select-countries"
                          class="form-control custom-select"
                          onChange={this.isChildhandle}
                        >
                          {this.state.editCategoryParent > 0 ? (
                            <option value="Yes">Yes</option>
                          ) : (
                            <option value="No">No</option>
                          )}
                        </select>
                      </div>
                    </div>
                    {this.state.editCategoryParent > 0 ? (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Parent Category</label>
                          <select
                            name="categoryParent"
                            id="select-countries"
                            class="form-control custom-select"
                            onChange={this.handleChange}
                          >
                            <option key="00" value="">
                              Select
                            </option>
                            {this.state.categories.map((tit, index) =>
                              tit.categoryParent == 0 ? (
                                <option
                                  selected={
                                    this.state.editCategoryParent ==
                                    tit.categoryId
                                      ? true
                                      : null
                                  }
                                  key={index}
                                  value={tit.categoryId}
                                >
                                  {tit.categoryName}
                                </option>
                              ) : null
                            )}
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* end edit */}
      </React.Fragment>
    );
  }
}

export default Categories;

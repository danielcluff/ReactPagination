import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectArray: this.props.objectArray,
      fullObjectArray: this.props.objectArray,
      totalItems: this.props.objectArray.length,
      activePage: 1,
      itemsPerPage: this.props.itemsPerPage,
      paginationHolder: [],
      paginationDisplay: [],
      paginationStart: 0,
      paginationEnd: this.props.itemsPerPage,
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleInitPagination = this.handleInitPagination.bind(this);
    this.handleUpdatePagination = this.handleUpdatePagination.bind(this);
  }

  componentDidMount() {
    let objectArray;
    if (this.props.objectArray.length > this.state.itemsPerPage) {
      objectArray = this.props.objectArray.slice(
        0,
        this.state.itemsPerPage
      );
    } else {
        objectArray = this.props.objectArray;
    }

    this.setState(
      {
        totalItems: this.props.objectArray.length,
        objectArray: objectArray,
        activePage: 1,
      },
      () => {
        this.handleInitPagination(this.props.objectArray);
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.objectArray !== prevProps.objectArray) {
      this.setState({
        objectArray: this.props.objectArray,
        fullObjectArray: this.props.objectArray,
        totalItems: this.props.objectArray.length,
        activePage: 1,
      }, () => {
        if (this.props.objectArray.length > this.state.itemsPerPage) {
          this.handleInitPagination(this.props.objectArray);
        }
        this.handlePaginationChange(0);
      });
    }
  }

  handlePaginationChange(pageNavigation) {
    let activePage;
    switch (pageNavigation) {
      case "next":
        let nextStart =
          this.state.paginationStart + this.state.itemsPerPage;
        let nextEnd =
          this.state.paginationEnd + this.state.itemsPerPage;
        activePage = this.state.activePage + 1;

        this.setState(
          {
            activePage: activePage,
            paginationStart: nextStart,
            paginationEnd: nextEnd,
            objectArray: this.state.fullObjectArray.slice(
              nextStart,
              nextEnd
            ),
          },
          () => {
            if (this.state.paginationHolder.length > 5) {
              this.handleUpdatePagination(activePage - 1);
            } else {
              this.props.paginationParentUpdate(
                this.state.objectArray
              );
            }
          }
        );
        break;

      case "prev":
          let prevStart =
            this.state.paginationStart - this.state.itemsPerPage;
          let prevEnd =
            this.state.paginationEnd - this.state.itemsPerPage;
          activePage = this.state.activePage - 1;
          this.setState(
            {
              activePage: activePage,
              paginationStart: prevStart,
              paginationEnd: prevEnd,
              objectArray: this.state.fullObjectArray.slice(
                prevStart,
                prevEnd
              ),
            },
            () => {
              if (this.state.paginationHolder.length > 5) {
                this.handleUpdatePagination(activePage - 1);
              } else {
                this.props.paginationParentUpdate(
                  this.state.objectArray
                );
              }
            }
          );
          break;

      default:
        let pageStart = pageNavigation * this.state.itemsPerPage;
        let pageEnd =
          this.state.itemsPerPage +
          pageNavigation * this.state.itemsPerPage;
        this.setState(
          {
            activePage: pageNavigation + 1,
            paginationStart: pageStart,
            paginationEnd: pageEnd,
            objectArray: this.state.fullObjectArray.slice(
              pageStart,
              pageEnd
            ),
          },
          () => {
            if (this.state.paginationHolder.length > 5) {
              this.handleUpdatePagination(pageNavigation);
            } else {
              this.props.paginationParentUpdate(
                this.state.objectArray
              );
            }
          }
        );
    }
  }

  handleInitPagination(objectArray) {
    let counter = Math.ceil(objectArray.length / this.state.itemsPerPage);
    let paginationHolder = [];
    for (let i = 0; i < counter; i++) {
      paginationHolder.push(i + 1);
    }
    this.setState(
      {
        objectArray: objectArray.slice(
          this.state.paginationStart,
          this.state.paginationEnd
        ),
        paginationHolder: paginationHolder,
        paginationDisplay: paginationHolder.slice(0, 5),
      },
      () => {
        this.handleUpdatePagination();
      }
    );
  }

  handleUpdatePagination(pageIndex = 0) {
    let paginationDisplay = this.state.paginationHolder;
    if (paginationDisplay.length > 5) {
      let paginationStart = 0;
      let paginationEnd = paginationDisplay.length - 1;
      if (
        this.state.activePage ===
        paginationDisplay[paginationDisplay.length - 1]
      ) {
        paginationStart = pageIndex - 4;
      } else if (
        this.state.activePage ===
        paginationDisplay[paginationDisplay.length - 2]
      ) {
        paginationStart = pageIndex - 3;
      } else if (this.state.activePage >= 4) {
        paginationStart = pageIndex - 2;
      }

      if (this.state.activePage < 3) {
        paginationEnd = 5;
      } else if (
        this.state.activePage >=
        paginationDisplay[paginationDisplay.length - 3]
      ) {
        paginationEnd = paginationDisplay.length;
      } else {
        paginationEnd = pageIndex + 3;
      }
      paginationDisplay = this.state.paginationHolder.slice(
        paginationStart,
        paginationEnd
      );
    }
    this.setState(
      {
        objectArray: this.state.fullObjectArray.slice(
          this.state.paginationStart,
          this.state.paginationEnd
        ),
        paginationDisplay: paginationDisplay,
      },
      () => this.props.paginationParentUpdate(this.state.objectArray)
    );
  }

  render() {
    return this.props.objectArray.length <
      this.props.itemsPerPage ? null : (
      <nav
          className="border-t border-gray-200 px-4 pb-4 flex items-center justify-between sm:px-6"
          aria-label="Pagination"
      >
        <div className="-mt-px w-0 flex-1 flex">
          {this.state.activePage > 1 && (
            <div
                onClick={() => this.handlePaginationChange("prev")}
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-400 group hover:text-gray-600  cursor-pointer duration-200"
            >
              <svg
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-600 duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
              >
                <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                />
              </svg>
              Previous
            </div>
          )}
        </div>
          <ul className="hidden md:-mt-px sm:flex">
            {this.state.activePage >= 4 &&
              this.state.paginationHolder.length > 5 && (
                <li
                  onClick={() => this.handlePaginationChange(0)}
                  className="hidden md:inline-flex border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200 border-t-2 pt-4 px-4 items-center text-sm font-medium cursor-pointer duration-200"
                >
                  1
                </li>
              )}
            {this.state.activePage >= 5 &&
              this.state.paginationHolder.length > 6 && (
                <li
                  className={`hidden md:inline-flex text-gray-400 border-transparent border-t-2 pt-4 px-4 items-center text-sm font-medium`}
                >
                  ...
                </li>
              )}
            {this.state.paginationDisplay.map((item) => {
              return (
                <li
                  onClick={() =>
                    this.handlePaginationChange(item - 1)
                  }
                  key={item}
                  className={`${
                    this.state.activePage === item
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
                  } border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer duration-200`}
                >
                    {item.toString(10)}
                </li>
              );
            })}
            {this.state.activePage <=
              this.state.paginationHolder[
                this.state.paginationHolder.length - 5
              ] &&
              this.state.paginationHolder.length > 6 && (
                <li
                  className={`hidden md:inline-flex text-gray-400 border-transparent border-t-2 pt-4 px-4 items-center text-sm font-medium`}
                >
                  ...
                </li>
              )}
            {this.state.activePage <=
              this.state.paginationHolder[
                this.state.paginationHolder.length - 4
              ] &&
              this.state.paginationHolder.length > 5 && (
                <li
                  onClick={() =>
                    this.handlePaginationChange(
                      this.state.paginationHolder.length - 1
                    )
                  }
                  className="hidden md:inline-flex border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200 border-t-2 pt-4 px-4 items-center text-sm font-medium cursor-pointer duration-200"
                >
                  {
                    this.state.paginationHolder[
                      this.state.paginationHolder.length - 1
                    ]
                  }
                </li>
              )}
          </ul>
          <div className="-mt-px w-0 flex-1 flex justify-end">
            {this.state.activePage <
              this.state.paginationHolder.length && (
              <div
                onClick={() => this.handlePaginationChange("next")}
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-400 group hover:text-gray-600 cursor-pointer duration-200"
              >
                Next
                <svg
                  className="ml-3 h-5 w-5 text-gray-400 group-hover:text-gray-600 duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
      </nav>
    );
  }
}

Pagination.defaultProps = {
  itemsPerPage: 20,
};

Pagination.propTypes = {
  paginationParentUpdate: PropTypes.func.isRequired,
  objectArray: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number,
};

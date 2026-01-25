export default function Table() {
  return (
    <div className="table mt-3 mt-md-5">
      <table
        className="table table-striped table-hover sortable"
        id="sortableTable"
      >
        <thead className="table-light">
          <tr>
            <th data-sort="string">
              Name
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>
            <th data-sort="number">
              Age
              <i className="bi bi-sort-numeric-down sort-icon"></i>
            </th>
            <th data-sort="string">
              Department
              <i className="bi bi-filter-circle sort-icon"></i>
            </th>
            <th data-sort="number">
              Salary
              <i className="bi bi-currency-dollar sort-icon"></i>
            </th>
            <th scope="col" data-sort="date">
              Join Date
              <i className="bi bi-calendar sort-icon"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>32</td>
            <td>Engineering</td>
            <td>75000</td>
            <td>2022-01-15</td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>28</td>
            <td>Marketing</td>
            <td>65000</td>
            <td>2021-08-23</td>
          </tr>
          <tr>
            <td>Mike Johnson</td>
            <td>45</td>
            <td>Engineering</td>
            <td>85000</td>
            <td>2019-03-10</td>
          </tr>
          <tr>
            <td>Sarah Wilson</td>
            <td>35</td>
            <td>HR</td>
            <td>60000</td>
            <td>2020-11-05</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

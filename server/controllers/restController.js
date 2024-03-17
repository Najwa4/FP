const EmployeeRestRequest = require('../models/Rest');

// Controller for employee rest request operations
const EmployeeRestRequestController = {
  // Create a new employee rest request
  createRequest: async (req, res) => {
    const { employeeId, department, startDate, endDate, reason } = req.body;

    try {
      const employeeRestRequest = new EmployeeRestRequest({
        employee: employeeId,
        department,
        startDate,
        endDate,
        reason,
        status: 'pending',
      });

      await employeeRestRequest.save();

      res.send('Employee rest request created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // Accept an employee rest request by the college
  acceptByCollege: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send('Employee rest request not found');
      }

      employeeRestRequest.status = 'accepted_college';
      await employeeRestRequest.save();

      res.send('Employee rest request accepted by the college successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // Reject an employee rest request by the college
  rejectByCollege: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send('Employee rest request not found');
      }

      employeeRestRequest.status = 'rejected_college';
      await employeeRestRequest.save();

      res.send('Employee rest request rejected by the college successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // Pass an accepted employee rest request from the college to HR staff
  passToHR: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send('Employee rest request not found');
      }

      if (employeeRestRequest.status !== 'accepted_college') {
        return res.status(400).send('Employee rest request must be accepted by the college before passing to HR');
      }

      employeeRestRequest.status = 'hr_review';
      await employeeRestRequest.save();

      res.send('Employee rest request passed to HR staff successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // Accept an employee rest request by HR staff
  acceptByHR: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send('Employee rest request not found');
      }

      if (employeeRestRequest.status !== 'hr_review') {
        return res.status(400).send('Employee rest request is not ready for HR review');
      }

      employeeRestRequest.status = 'accepted_hr';
      await employeeRestRequest.save();

      res.send('Employee rest request accepted by HR staff successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // Reject an employee rest request by HR staff
  rejectByHR: async (req, res) => {
    const { requestId } = req.params;

    try {
      const employeeRestRequest = await EmployeeRestRequest.findById(requestId);

      if (!employeeRestRequest) {
        return res.status(404).send('Employee rest request not found');
      }

      if (employeeRestRequest.status !== 'hr_review') {
        return res.status(400).send('Employee rest request is not ready for HR review');
      }

      employeeRestRequest.status = 'rejected_hr';
      await employeeRestRequest.save();

      res.send('Employee rest request rejected by HR staff successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
};

module.exports = EmployeeRestRequestController;
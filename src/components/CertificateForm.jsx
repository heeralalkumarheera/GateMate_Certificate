import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { COURSE_OPTIONS, DATE_RANGE_OPTIONS, DURATION_OPTIONS } from '../config/certificateConfig';

export default function CertificateForm({ data, onChange, onGenerate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate();
  };

  const handlePeriodChange = (event) => {
    const value = event.target.value;

    if (value === 'custom') {
      onChange({
        target: { name: 'periodPreset', value },
      });
      return;
    }

    const selected = DATE_RANGE_OPTIONS.find((item) => item.label === value);
    if (!selected) return;

    onChange({ target: { name: 'periodPreset', value } });
    onChange({ target: { name: 'startDate', value: selected.start } });
    onChange({ target: { name: 'endDate', value: selected.end } });
  };

  const showCustomDates = data.periodPreset === 'custom';

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-title">
        <h2>Certificate Details</h2>
        <p>Fill the student details and generate the certificate.</p>
      </div>

      <div className="form-grid">
        <InputField
          label="Reference No."
          name="referenceNo"
          value={data.referenceNo}
          onChange={onChange}
          placeholder="GM/2026/M0123/ICC"
          required
        />

        <InputField
          label="Issue Date"
          name="date"
          value={data.date}
          onChange={onChange}
          type="date"
          required
        />

        <InputField
          label="Student Name"
          name="studentName"
          value={data.studentName}
          onChange={onChange}
          placeholder="Student Name"
          required
        />

        <SelectField
          label="Course"
          name="course"
          value={data.course}
          onChange={onChange}
          options={COURSE_OPTIONS}
          required
        />

        <SelectField
          label="Duration"
          name="duration"
          value={data.duration}
          onChange={onChange}
          options={DURATION_OPTIONS}
          required
        />

        <SelectField
          label="Internship Period"
          name="periodPreset"
          value={data.periodPreset}
          onChange={handlePeriodChange}
          options={DATE_RANGE_OPTIONS.map((item) => ({ value: item.custom ? 'custom' : item.label, label: item.label }))}
          required
        />

        {showCustomDates && (
          <>
            <InputField
              label="Custom Start Date"
              name="startDate"
              value={data.startDate}
              onChange={onChange}
              type="date"
              required
            />

            <InputField
              label="Custom End Date"
              name="endDate"
              value={data.endDate}
              onChange={onChange}
              type="date"
              required
            />
          </>
        )}

        <InputField
          label="College Name"
          name="collegeName"
          value={data.collegeName}
          onChange={onChange}
          placeholder="College / Institute Name"
          required
        />

        <InputField
          label="Registration No."
          name="registrationNo"
          value={data.registrationNo}
          onChange={onChange}
          placeholder="Registration Number"
          required
        />

        <InputField
          label="University"
          name="university"
          value={data.university}
          onChange={onChange}
          placeholder="University Name"
          required
        />
      </div>

      <button className="primary-btn" type="submit">
        Generate Certificate
      </button>

      <p className="small-note">
        Course-specific paragraph is generated automatically. The QR stores the student details inside the code itself.
      </p>
    </form>
  );
}

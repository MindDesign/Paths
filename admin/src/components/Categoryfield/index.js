import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';

export default function Index({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) {
  const { formatMessage } = useIntl();
  const [err, setErr] = useState(''); 

  return (
    <Stack spacing={1}>
      <TextInput
        placeholder="Please select a category"
        label="Path"
        name="categoryfield"
        onChange={(event) => {onChange({target: {name, value: event.target.value, type: 'string' }})}}
        value={value || ''}
      />
    </Stack>
  )
}
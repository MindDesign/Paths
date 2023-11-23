/*
 *
 * Confirm Delete Path Component
 *
 */

import React, { useEffect, useState } from 'react';
import pluginId from '../../pluginId';
import { Dialog, DialogBody, DialogFooter, Button, Flex, Typography } from '@strapi/design-system';
import { ExclamationMarkCircle, Trash } from '@strapi/icons';

export default function ConfirmDeletePath(show) {
  const [isVisible, setIsVisible] = useState(false);


  return <>
    <Button onClick={() => setIsVisible(true)}>Click me</Button>
    <Dialog onClose={() => setIsVisible(false)} title="Confirmation" isOpen={isVisible}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter startAction={<Button onClick={() => setIsVisible(false)} variant="tertiary">
        Cancel
      </Button>} endAction={<Button variant="danger-light" startIcon={<Trash />}>
        Confirm
      </Button>} />
    </Dialog>
  </>;
};

// admin/src/pages/Settings/index.js
import React, { useEffect, useState } from 'react';

import pathsRequests from '../../api/paths';

import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';

import {
  Box,
  Stack,
  Button,
  Grid,
  GridItem,
  HeaderLayout,
  ContentLayout,
  Typography,
  ToggleInput
} from '@strapi/design-system';

import Check from '@strapi/icons/Check';

const Settings = () => {
  const [settings, setSettings] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleNotification = useNotification();

  useEffect(() => {
    pathsRequests.getSettings().then((data) => {
      setSettings(data);
      setIsLoading(false);
    });
  }, [setSettings]);

  const handleSubmit = async () => {
    setIsSaving(true);
    const data = await pathsRequests.setSettings(settings);
    setSettings(data);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: 'Settings successfully updated',
    });
  };

  return (
    <>
      <HeaderLayout
        id="title"
        title="Paths General settings"
        subtitle="Manage the settings and behaviour of your paths plugin"
        primaryAction={
          isLoading ? (
            <></>
          ) : (
            <Button
              onClick={handleSubmit}
              startIcon={<Check />}
              size="L"
              disabled={isSaving}
              loading={isSaving}
            >
              Save
            </Button>
          )
        }
      ></HeaderLayout>
      {isLoading ? (
        <LoadingIndicatorPage />
      ) : (
        <ContentLayout>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
          >
            <Stack size={3}>
              <Typography>General settings</Typography>
              <Grid gap={6}>
                <GridItem col={12} s={12}>
                  <ToggleInput
                    checked={settings?.disabled ?? false}
                    hint="Cross or disable checkbox tasks marked as done"
                    offLabel="Cross"
                    onLabel="Disable"
                    onChange={e => {
                      setSettings({
                        disabled: e.target.checked,
                      });
                    }}
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Box>
        </ContentLayout>
      )}
    </>
  );
};

export default Settings;
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CountryOfOrigin } from './CountryOfOrigin';
import { Measurements } from './Measurements';
import { FiberContent } from './FiberContent';
import { CareInstructions } from './CareInstructions';
import { AdditionalInfo } from './AdditionalInfo';
import { Languages } from './Languages';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingLeft: 5 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        minHeight: '100vh',
        paddingTop: 3

      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          width: '180px',
          flexShrink: 0,
        }}
      >
        <Tab label="Measurements" {...a11yProps(0)} />
        <Tab label="Country of Orgin" {...a11yProps(1)} />
        <Tab label="Fiber Content" {...a11yProps(2)} />
        <Tab label="Care Instructions" {...a11yProps(3)} />
        <Tab label="Additional info" {...a11yProps(4)} />
        <Tab label="Languages" {...a11yProps(5)} />
      </Tabs>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <TabPanel value={value} index={0}>
          <Measurements />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CountryOfOrigin />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FiberContent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CareInstructions />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AdditionalInfo />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Languages />
        </TabPanel>
      </Box>
    </Box>

  );
}
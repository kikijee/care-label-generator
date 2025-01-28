import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StraightenIcon from '@mui/icons-material/Straighten';
import PublicIcon from '@mui/icons-material/Public';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if screen is 'sm' or smaller
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
        paddingTop: 3,
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
    width: { xl: '130px', lg: '130px', md: '130px', sm: '40px', xs: '40px' },
    flexShrink: 0,
    padding: 0, 
    alignItems: 'flex-start', 
  }}
>
  <Tab
    icon={isSmallScreen ? <StraightenIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Measurements' : ''}
    {...a11yProps(0)}
    sx={{
      padding: 0, 
      textAlign: 'left', 
      justifyContent: 'flex-start', 
    }}
  />
  <Tab
    icon={isSmallScreen ? <PublicIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Country of Origin' : ''}
    {...a11yProps(1)}
    sx={{
      padding: 0,
      textAlign: 'left',
      justifyContent: 'flex-start',
    }}
  />
  <Tab
    icon={isSmallScreen ? <FiberManualRecordIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Fiber Content' : ''}
    {...a11yProps(2)}
    sx={{
      padding: 0,
      textAlign: 'left',
      justifyContent: 'flex-start',
    }}
  />
  <Tab
    icon={isSmallScreen ? <CleaningServicesIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Care Instructions' : ''}
    {...a11yProps(3)}
    sx={{
      padding: 0,
      textAlign: 'left',
      justifyContent: 'flex-start',
    }}
  />
  <Tab
    icon={isSmallScreen ? <InfoIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Additional Info' : ''}
    {...a11yProps(4)}
    sx={{
      padding: 0,
      textAlign: 'left',
      justifyContent: 'flex-start',
    }}
  />
  <Tab
    icon={isSmallScreen ? <LanguageIcon /> : undefined}
    iconPosition="start"
    label={!isSmallScreen ? 'Languages' : ''}
    {...a11yProps(5)}
    sx={{
      padding: 0,
      textAlign: 'left',
      justifyContent: 'flex-start',
    }}
  />
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

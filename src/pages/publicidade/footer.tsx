import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import logo from '../../images/logosenac.svg'
import { Grid } from '@mui/material';
import "./publicidade.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const mediaIcons = [
  {
    icon: <InstagramIcon sx={{ fontSize: '30px' }} />,
    url: 'https://www.instagram.com/senac_ms/'
  },
  {
    icon: <FacebookIcon sx={{ fontSize: '30px' }} />,
    url: 'https://www.facebook.com/Senacms-204562209606799/'
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: '30px' }} />,
    url: 'https://www.linkedin.com/company/senacms'
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: '30px' }} />,
    url: 'https://api.whatsapp.com/send?phone=5567999492638'
  },

]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', marginTop: '2em' }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h6" align="center" gutterBottom>
              <a target="_blank" rel="noreferrer" href='https://ww3.ms.senac.br/'>
                <img className='imgFooter' src={`${logo}`} alt="Logo" />
              </a>
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {mediaIcons.map((item, index) => (
                <a key={index} className='linkIcons' target="_blank" rel="noreferrer" href={`${item.url}`}>
                  <Box
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        color: '#1976d2', // cor do hover
                        transform: 'scale(1.1)' // efeito de aumento
                      },
                    }}
                  >
                    {item.icon}
                  </Box>
                </a>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
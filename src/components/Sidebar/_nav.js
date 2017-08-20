const menus = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'UI elements',
      wrapper: {
        // optional wrapper object
        element: 'span', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Components',
      url: '/components',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Buttons',
          url: '/components/buttons',
          icon: 'icon-puzzle'
        },
        {
          name: 'Social Buttons',
          url: '/components/social-buttons',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/components/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/components/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Modals',
          url: '/components/modals',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/components/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/components/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tabs',
          url: '/components/tabs',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star'
        }
      ]
    }
  ]
};

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Playground',
      url: '/playground',
      icon: 'fa fa-ball'
    },
    {
      title: true,
      name: 'Merchant Setup'
    },
    {
      name: 'Brand',
      url: '/brands/',
      icon: 'icon-tag'
    },
    {
      name: 'Merchant',
      url: '/components/social-buttons',
      icon: 'icon-basket-loaded'
    },
    {
      name: 'Loyalty Program',
      url: '/components/cards',
      icon: 'fa fa-handshake-o'
    },
    {
      name: 'Coupon Credit',
      url: '/components/forms',
      icon: 'icon-credit-card'
    },
    {
      name: 'Tesjor Coin Program',
      url: '/components/modals',
      icon: 'fa fa-money'
    },
    {
      name: 'Billing Method',
      url: '/components/modals',
      icon: 'icon-paypal'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Activity'
    },
    {
      name: 'Advertisement',
      url: '/pages',
      icon: 'fa fa-bullhorn'
    },
    {
      name: 'Announcement',
      url: '/pages',
      icon: 'fa fa-newspaper-o'
    },
    {
      name: 'Auction',
      url: '/pages',
      icon: 'fa fa-globe'
    },
    {
      name: 'Featured Restaurant',
      url: '/pages',
      icon: 'icon-star'
    },
    {
      name: 'Force Update App',
      url: '/pages',
      icon: 'icon-screen-smartphone'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Report'
    },
    {
      name: 'Transaction',
      url: '/pages',
      icon: 'fa fa-list-alt'
    },
    {
      name: 'Billing Report',
      url: '/pages',
      icon: 'fa fa-file-text-o'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Configuration'
    },
    {
      name: 'System Users',
      url: '/dashboard',
      icon: 'icon-people'
    },
    {
      name: 'Topup Devices',
      url: '/dashboard',
      icon: 'icon-screen-smartphone'
    },
    {
      name: 'Code Table',
      url: '/widgets',
      icon: 'fa fa-table'
    },
    {
      name: 'Localization',
      url: '/components',
      icon: 'fa fa-language',
      children: [
        {
          name: 'Language',
          url: '/components/buttons'
        },
        {
          name: 'Translation',
          url: '/components/social-buttons'
        },
        {
          name: 'Translation Screen',
          url: '/components/cards'
        }
      ]
    }
  ]
};

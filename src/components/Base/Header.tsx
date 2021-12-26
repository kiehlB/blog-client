import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
];
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
  },
  { id: 3, name: 'Improve your customer experience', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <div className="flex  items-center">
                <svg
                  width="100"
                  height="30"
                  viewBox="0 0 171 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M46.2578 2.60938C46.2578 2.84375 46.2031 3.13281 46.0938 3.47656C45.7188 4.49219 45.3828 5.375 45.0859 6.125L32.6641 36.2891L23.8281 16.5547L14.6641 36.2891L0.789062 1.83594H13.6328L20.2188 19.3906L29.1484 0.335938L37.4688 19.3438L43.3281 5.58594C43.5312 5.07031 43.7031 4.5625 43.8438 4.0625L44.2422 2.63281C44.4141 1.92969 44.7891 1.57812 45.3672 1.57812C45.9609 1.57812 46.2578 1.92188 46.2578 2.60938ZM48.9297 22.3438C48.9297 20.4688 49.2656 18.7656 49.9375 17.2344C50.625 15.6875 51.5625 14.3438 52.75 13.2031C55.3125 10.7656 58.5312 9.54688 62.4062 9.54688C66.3594 9.54688 69.5781 10.8125 72.0625 13.3438C74.4375 15.7344 75.625 18.7578 75.625 22.4141C75.625 26.0859 74.4062 29.1562 71.9688 31.625C69.4531 34.1719 66.2344 35.4453 62.3125 35.4453C58.4844 35.4453 55.3125 34.2344 52.7969 31.8125C50.2188 29.3125 48.9297 26.1562 48.9297 22.3438ZM61.6562 33.6875C61.7812 33.7031 61.9062 33.7109 62.0312 33.7109H62.3594C65.5156 33.7109 68.1641 32.7344 70.3047 30.7812C72.5859 28.6719 73.7266 25.9062 73.7266 22.4844C73.7266 19.1406 72.6562 16.4297 70.5156 14.3516C68.4062 12.2891 65.6797 11.2578 62.3359 11.2578H61.9844C61.875 11.2578 61.7656 11.2656 61.6562 11.2812V33.6875ZM79.4922 22.3438C79.4922 20.4688 79.8281 18.7656 80.5 17.2344C81.1875 15.6875 82.125 14.3438 83.3125 13.2031C85.875 10.7656 89.0938 9.54688 92.9688 9.54688C96.9219 9.54688 100.141 10.8125 102.625 13.3438C105 15.7344 106.188 18.7578 106.188 22.4141C106.188 26.0859 104.969 29.1562 102.531 31.625C100.016 34.1719 96.7969 35.4453 92.875 35.4453C89.0469 35.4453 85.875 34.2344 83.3594 31.8125C80.7812 29.3125 79.4922 26.1562 79.4922 22.3438ZM92.2188 33.6875C92.3438 33.7031 92.4688 33.7109 92.5938 33.7109H92.9219C96.0781 33.7109 98.7266 32.7344 100.867 30.7812C103.148 28.6719 104.289 25.9062 104.289 22.4844C104.289 19.1406 103.219 16.4297 101.078 14.3516C98.9688 12.2891 96.2422 11.2578 92.8984 11.2578H92.5469C92.4375 11.2578 92.3281 11.2656 92.2188 11.2812V33.6875ZM129.555 12.5234C129.164 12.2734 128.742 12.1484 128.289 12.1484C127.836 12.1484 127.367 12.2578 126.883 12.4766C126.398 12.6797 125.891 12.9688 125.359 13.3438C124.25 14.1406 123.227 15.2031 122.289 16.5312V35H112.211V9.96875H122.289V13.9766C124.961 11.0234 127.984 9.54688 131.359 9.54688C136.875 9.54688 139.633 12.2188 139.633 17.5625V35H129.555V12.5234ZM152.43 27.3594C151.039 27.7812 150.344 28.2422 150.344 28.7422C150.344 29.2266 150.75 29.5625 151.562 29.75C153.141 30.125 155.312 30.3516 158.078 30.4297C160.844 30.4922 162.922 30.7031 164.312 31.0625C165.719 31.4062 166.836 31.8438 167.664 32.375C169.164 33.3594 169.914 34.6641 169.914 36.2891C169.914 38.3203 168.906 39.9688 166.891 41.2344C164.656 42.625 161.508 43.3203 157.445 43.3203C153.242 43.3203 149.773 42.6953 147.039 41.4453C146.055 40.9609 145.562 40.4141 145.562 39.8047C145.562 39.5391 145.656 39.3281 145.844 39.1719C146.047 39.0156 146.258 38.9375 146.477 38.9375C146.742 38.9375 147.047 39.0391 147.391 39.2422C148.188 39.6953 148.922 40.0703 149.594 40.3672C150.281 40.6797 151.352 40.9766 152.805 41.2578C154.258 41.5391 155.656 41.6797 157 41.6797C158.359 41.6797 159.461 41.6172 160.305 41.4922C161.164 41.3828 161.875 41.25 162.438 41.0938C163.547 40.7656 164.102 40.3984 164.102 39.9922C164.102 39.6172 163.992 39.3438 163.773 39.1719C163.555 39 163.266 38.8438 162.906 38.7031C162.562 38.5781 162.078 38.4609 161.453 38.3516C160.172 38.1328 158.43 37.9688 156.227 37.8594C154.023 37.75 152.281 37.5312 151 37.2031C149.719 36.8906 148.672 36.4844 147.859 35.9844C146.281 35.0312 145.492 33.7422 145.492 32.1172C145.492 29.7734 147.078 27.875 150.25 26.4219C148.797 25.625 147.641 24.5781 146.781 23.2812C145.922 21.9688 145.492 20.5547 145.492 19.0391C145.492 17.5078 145.773 16.1875 146.336 15.0781C146.914 13.9531 147.719 12.9844 148.75 12.1719C150.922 10.4219 153.727 9.54688 157.164 9.54688C158.695 9.54688 160.234 9.78125 161.781 10.25C164 8.10938 166.055 7.03906 167.945 7.03906C168.742 7.03906 169.328 7.17188 169.703 7.4375C170.094 7.70312 170.289 8.03906 170.289 8.44531C170.289 8.85156 170.156 9.14844 169.891 9.33594C169.625 9.50781 169.375 9.59375 169.141 9.59375C168.719 9.59375 168.359 9.54688 168.062 9.45312C167.625 9.29688 167.18 9.21875 166.727 9.21875C165.883 9.21875 164.82 9.80469 163.539 10.9766C166.086 12.2266 167.75 14.0234 168.531 16.3672C168.781 17.1484 168.906 18.1094 168.906 19.25C168.906 20.375 168.578 21.5 167.922 22.625C167.266 23.75 166.391 24.7188 165.297 25.5312C163.016 27.2188 160.336 28.0625 157.258 28.0625C155.633 28.0938 154.023 27.8594 152.43 27.3594ZM157.352 26.3516C159.883 26.3203 162.062 25.7031 163.891 24.5C166 23.125 167.055 21.2656 167.055 18.9219C167.055 16.5781 166.016 14.6875 163.938 13.25C162.031 11.9375 159.836 11.2578 157.352 11.2109V26.3516Z"
                    fill="#1FB6FF"
                  />
                </svg>
                <HeaderTagWrapper>
                  <svg
                    width="4"
                    height="10"
                    viewBox="0 0 4 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.99975 10L0.564752 6.132C-0.185248 5.507 -0.191248 4.497 0.564752 3.868L3.99975 0V10Z"
                      fill="#1FB6FF"
                    />
                  </svg>
                  <HeadTag>Contribute to the blog</HeadTag>
                </HeaderTagWrapper>
              </div>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    )}>
                    <span>Solutions</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {solutions.map(item => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <item.icon
                                className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          {callsToAction.map(item => (
                            <div key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">{item.name}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900">
              Pricing
            </a>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900">
              Docs
            </a>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    )}>
                    <span>More</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map(item => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <item.icon
                                className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                              Recent Posts
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map(post => (
                                <li key={post.id} className="text-base truncate">
                                  <a
                                    href={post.href}
                                    className="font-medium text-gray-900 hover:text-gray-700">
                                    {post.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500">
                              {' '}
                              View all posts <span aria-hidden="true">&rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="#"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Sign in
            </a>
            <a
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-regal-sky">
              Sign up
            </a>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>
                {resources.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700">
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const HeaderTagWrapper = styled.nav`
  display: flex;
  margin-left: 0.5rem;

  & > svg {
    display: flex;
    align-items: center;
    height: 1.375rem;
  }
`;

const HeadTag = styled.nav`
  width: 8.5rem;
  height: 1.375rem;
  background-color: #1fb6ff;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  padding: 0px 5px 0px 5px;
  color: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

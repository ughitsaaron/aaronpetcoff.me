---
title: Make Your Life a Little Better by Deploying with Git
draft: false
template: post
date: 1/11/2015 2:45 PM
---

Git deployment has been covered pretty thoroughly by a few different writers (for instance, [here](http://someguyjeremy.com/blog/quick-and-dirty-git-deployment "Quick and Dirty Git Deployment") and [here](http://www.arlocarreon.com/blog/git/push-git-repo-into-shared-hosting-account-like-hostgator/ "Push Git Repo Into Shared Hosting Account")). Nevertheless, I thought I'd contribute my own experience to the collection of articles and resources out there.

Deploying with git offers many benefits such as speed, simplicity, and the fact that you bring version control into the center of your deployment strategy.  But if you haven't used this approach for anything before, switching may present some challenges in terms of having to learn some new skills and step outside of your traditional comfort zone.

What we're going to do is pretty straightforward: We'll SSH into our host and set up a remote repository that will load our changes after each push.

### Setting up SSH
First we'll want to get everything set up to SSH into our host.

```
$ ssh user_name@domain.com

# If your host requires a port, add the number
# following the -p flag, for instance
$ ssh user_name@domain.com -p 22
```

You'll be prompted for your password. That's fine. But in order to deploy to your host with git, you'll want to configure SSH to use a public key instead. Using keys for SSH is generally considered a best practice anyway.

```
# If you don't have a public key yet, generate one
$ ssh-keygen # Hit enter all the way through

# This will produce a key at ~/.ssh/id_rsa.pub on your
# local workstation. Copy it to your server.
$ scp ~/.ssh/id_rsa.pub server_user@domain.com:~/.ssh/authorized_keys
```

After setting up your keys, you'll want to initiate your remote repository and set it up to accept pushes.

```
$ cd /path/to/your/project/
$ git init

# This will initiate a new git repository on your
# host. Now we want to configure it to accept pushes
$ git config receive.denyCurrentBranch ignore

# You can confirm the configuration by checking your settings
$ git config --list
```

Next we're going to set up our hook to refresh the working directory. This will allow changes to your project to become reflected right away. The hook we want to set up is a ```post-receive``` hook, meaning it will run commands after the push has been completed.

Create a new file in your in `/path/to/your/project/.git/hooks` called `post-receive`.

```bash
#!/bin/sh
GIT_WORK_TREE=../ git checkout -f
```
Once the file is saved to `.git/hooks` you're need to make it executable.

```
$ chmod +x /path/to/project/.git/hooks/post-receive
```

Now our remote repository is set up to receive pushes and to reflect new changes right away.

As things stand, however, if anybody pointed their browser to `http://yourdomain.com/.git/` they'd be able to peer into your whole repository. For security reasons, we want to make sure to prevent HTTP requests to our `.git` directory.

There are competing approaches to accomplishing this, including restricting access to it through `.htaccess` or by altering the permissions. I haven't tried every approach and so I'd welcome a conversation about this.

I prefer to modify the `.htaccess` and add the following line.

```apache
RedirectMatch 404 /\.git
```

This will not only forbid HTTP access to our `.git` directory and all other `.git*` files, e.g., `.gitignore`, `.gitmodules`, etc., it also doesn't even reveal that they exist in the first place.

###Setting and pushing up local repository
Now we have to set up our local repository. To push to our remote, we'll need to tell our local machine that we won't be requiring a password to connect to our host. To do that we'll have to set up our `~/.ssh/config`.

```bash
# Create ~/.ssh/config if it doesn't exist
Host your-domain.com
  Port 22
  PreferredAuthentications publickey
```

In your local project directory you'll need to create your new git repository and add the repository on your server as a remote

```
$ git init
$ git remote add remotename user_name@domain.com:path/to/project
```

From here you can commit you whole project and push it to your remote repository

```
$ git push remotename master
```

If our post-receive hook is working properly, and all our SSH settings are correct, the remote should refresh the working directory automatically and any changes should be reflected immediately.

### Conclusion
This is the bare bones of a simple deployment strategy using git. The benefits -- including the simplicity, bringing together version control and deployment, etc -- are clear. In another post coming soon, I'll discuss how to bring databases into the mix to help synchronize deployment for platforms like Wordpress.
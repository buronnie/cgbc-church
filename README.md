# Church Finane Management System

## User permission

### Pundit + Rolify for permission management. 


* Each controller has a corresponding policy class to give granular access control.  
    
  ```
    class PostPolicy < ApplicationPolicy
      def update?
        user.admin? or not record.published?
      end
    end
  ```
  
  Need to add `authorize Post` in `before action` to make it look for the policy file.
  
  
* Rolify is a roles library. 

  `user.has_role?(:moderator, Forum.first)`
  
  Need to configure the model
  
  ```
  class Forum < ActiveRecord::Base
    resourcify
  end
  ```
  
  To define a global role:
  
  ```
  user = User.find(1)
  user.add_role :admin
  ```
  
  
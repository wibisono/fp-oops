module TNavs 
    class TNavs < Liquid::Block
        def initialize(tag_name, tnavs, tokens)
            super
            @tnavs = tnavs.strip
        end
        def render(context)
            '<ul id="'+@tnavs+'" class="nav nav-tabs">' + super + '</ul>'
        end
    end 

    class TNav < Liquid::Block
        def initialize(tag_name, tnav, tokens)
            super
            (@tnav, rest) = tnav.strip.split(/\s+/)
            @active = rest != nil && rest.include?('active')
        end

        def render(context)
            return "" if @tnav.empty?

            site      = context.registers[:site]
            converter = site.find_converter_instance(Jekyll::Converters::Markdown)

            lines = super.rstrip.split(/\r\n|\r|\n/).select { |line| line.size > 0 }
            indentation = lines.map do |line|
                match = line.match(/^(\s+)[^\s]+/)
            match ? match[1].size : 0
            end
            indentation = indentation.min

            content = indentation ? super.gsub(/^#{' |\t' * indentation}/, '') : super
            content = converter.convert(content)
            content = content.strip # Strip again to avoid "\n"

            if @active
                '<li class="active"> <a class="nav-link" href="#' + @tnav + '" data-toggle="tab">' + content + '</a></li>'
            else
                '<li> <a class="nav-link" href="#' + @tnav + '" data-toggle="tab">' + content + '</a></li>'
            end    
        end
    end

 end 

Liquid::Template.register_tag("tnavs", TNavs::TNavs)
Liquid::Template.register_tag("tnav",  TNavs::TNav)

